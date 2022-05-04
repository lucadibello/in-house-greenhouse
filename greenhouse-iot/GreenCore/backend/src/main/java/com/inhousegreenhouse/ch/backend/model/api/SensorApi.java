package com.inhousegreenhouse.ch.backend.model.api;

import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.sensor.*;
import com.inhousegreenhouse.ch.backend.model.sensor.core.ISensor;
import com.inhousegreenhouse.ch.backend.model.sensor.core.Position;
import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorType;
import com.inhousegreenhouse.ch.backend.model.util.GraphQLQuery;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * SensorApi is a class that handles all requests to the Sensor API.
 */
public class SensorApi extends Api{

    /**
     * Get all sensors from the API.
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

                    // Check type of sensor
                    if (typeEnum == SensorType.TEMPERATURE) {
                        // Create temperature sensor

                        // FIXME: Set channel automatically
                        sensors.add(new TemperatureSensor(name, 0, adc, 1));
                    } else if (typeEnum == SensorType.HUMIDITY) {
                        // Create humidity sensor

                        // FIXME: Set channel automatically
                        sensors.add(new HumiditySensor(name, 0, adc, 1));
                    } else if (typeEnum == SensorType.SOIL_MOISTURE) {
                        // Create soil moisture sensor

                        // FIXME: Set channel automatically
                        sensors.add(new MoistureSensor(name, positionEnum,0, adc, 1));
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
            .addVariable("value", sensor.updateAndGet())
            .addVariable("greenhouseId", greenhouse.getId());

        // Build API request
        final ApiRequest request = new ApiRequest(
                this,
                query,
                new ApiHeader("X-Greenhouse-UUID", greenhouse.getId())
        );

        // Send HTTP requests to API base URL and get response
        final ApiResponse response = sendRequest(request);

        // Check if response is valid
        if (!response.isSuccess) {
            // Check if response is a GraphQL error
            if (response.isGraphQLResponseError()) {
                throw new ProxyRequestFailException(response);
            }
        }
    }
}
