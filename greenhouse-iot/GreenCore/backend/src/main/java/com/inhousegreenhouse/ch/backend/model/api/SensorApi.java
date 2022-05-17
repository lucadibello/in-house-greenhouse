package com.inhousegreenhouse.ch.backend.model.api;

import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.greenhouse.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.HumiditySensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.MoistureSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.TemperatureSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.AnalogSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.ISensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.Position;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core.SensorType;
import com.inhousegreenhouse.ch.backend.model.util.GraphQLQuery;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * SensorApi is a class that handles all requests to the Sensor API.
 */
public class SensorApi extends Api {

    public SensorApi(String proxyUrl) {
        // Print proxy URl
        super(proxyUrl);
    }

    /**
     * Get all sensors from the API.
     * @param greenhouse The greenhouse where the sensor are attached to.
     * @param adc The AdC to use to read the sensor.
     * @return List of all sensors.
     * @throws ProxyRequestFailException If the request fails.
     */
    public List<ISensor<? extends Number>> getSensors(Greenhouse greenhouse, ADC adc) throws ProxyRequestFailException {
        // Build GraphQL query
        final GraphQLQuery query = new GraphQLQuery(
                "query Sensors {",
                "    sensors {",
                "        name",
                "        type",
                "        positionType",
                "    }",
                "}"
        );

        // Build API request
        final ApiRequest request = new ApiRequest(
            this,
            query,
            new ApiHeader("X-Greenhouse-UUID", greenhouse.getId())
        );

        // Send HTTP requests to API base URL and get response
        final ApiResponse response = sendRequest(request);

        // Check if response is valid
        if (response.isSuccess) {
            // Create empty list of sensors
            List<ISensor<? extends Number>> sensors = new ArrayList<>();

            JSONArray sensorsJson = response.data.getJSONObject("data").getJSONArray("sensors");
            for (int i = 0; i < sensorsJson.length(); i++) {
                JSONObject sensor = sensorsJson.getJSONObject(i);
                // Get sensor data
                String name = sensor.getString("name");
                String type = sensor.getString("type");
                String positionType = sensor.getString("positionType");

                try {
                    // Convert type string to enum
                    SensorType typeEnum = SensorType.valueOf(type);
                    Position positionEnum = Position.valueOf(positionType);

                    // Get next channel for the sensor type
                    final int channel = AnalogSensor.channels.getNextChannel(typeEnum);

                    // Notify chosen channel to console
                    System.out.println("Chosen channel for sensor " + name + ": " + channel);

                    // Check type of sensor
                    if (typeEnum == SensorType.TEMPERATURE) {
                        // Create temperature sensor
                        sensors.add(new TemperatureSensor(name, 0, adc, channel));
                    } else if (typeEnum == SensorType.HUMIDITY) {
                        // Create humidity sensor
                        sensors.add(new HumiditySensor(name, 0, adc, channel));
                    } else if (typeEnum == SensorType.SOIL_MOISTURE) {
                        // Create soil moisture sensor
                        sensors.add(new MoistureSensor(name, positionEnum,0, adc, channel));
                    } else {
                        // Unsupported sensor type
                        System.out.printf(
                            "[SensorApi] Sensor type %s is not supported yet. I'll skip this sensor.\n",
                            type
                        );
                    }
                } catch (IllegalArgumentException e) {
                    System.out.printf("[SensorApi] Sensor with name %s has an unknown" +
                            " position (%s) or type (%s) . I'll skip this sensor.\n", name, positionType, type);
                } catch (IllegalCallerException e) {
                    System.out.println("Sensor " + name + " has not been registered inside the channel manager.");
                } catch (NullPointerException e) {
                    System.out.println("Sensor " + name + " has no more available channels.");
                }
            }

            // Return sensor list
            return sensors;
        } else {
            throw new ProxyRequestFailException(response);
        }
    }

    public void recordData (ISensor<? extends Number> sensor, Greenhouse greenhouse) throws ProxyRequestFailException, SpiCannotBeInitializedException {
        // Build GraphQL query
        final GraphQLQuery query = new GraphQLQuery(
                "mutation RecordData($sensor: String!, $value: Float!, $greenhouseId: String!) {",
                "    recordData(sensor: $sensor, value: $value, greenhouseId: $greenhouseId) {",
                "        id",
                "    }",
                "}"
        )
            .addVariable("sensor", sensor.getName())
            .addVariable("value", sensor.getCachedValue())
            .addVariable("greenhouseId", greenhouse.getId());

        // Build API request
        final ApiRequest request = new ApiRequest(
                this,
                query,
                new ApiHeader("X-Greenhouse-UUID", greenhouse.getId())
        );

        // Send HTTP requests to API base URL and get response
        final ApiResponse response = sendRequest(request);

        // check if request was successful
        if (!response.isSuccess) {
            throw new ProxyRequestFailException(response);
        } else if (response.isGraphQLResponseError()) {
            ApiResponse copy = new ApiResponse(true, "Cannot save data. !MAYBE! There is any plant placed in that position", response.data.toString());
            throw new ProxyRequestFailException(copy);
        }
    }
}
