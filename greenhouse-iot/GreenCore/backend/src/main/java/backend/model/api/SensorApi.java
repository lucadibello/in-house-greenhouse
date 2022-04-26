package backend.model.api;

import backend.exception.ProxyRequestFailException;
import backend.model.sensor.ISensor;
import backend.model.util.GraphQLQuery;

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
    public List<ISensor> getSensors() throws ProxyRequestFailException {
        // Build GraphQL query
        final GraphQLQuery query = new GraphQLQuery(
                "query Sensors {",
                "    sensors {",
                "        name",
                "        type",
                "    }",
                "}"
        );

        // Build API request
        final ApiRequest request = new ApiRequest(
            this,
            query,
            new ApiHeader("X-Greenhouse-UUID", "FIXME") // FIXME: Replace with real UUID
        );

        // Send HTTP requests to API base URL and get response
        final ApiResponse response = sendRequest(request);

        // Check if response is valid
        if (response.isSuccess) {
            // Create empty list of sensors
            List<ISensor> sensors = new ArrayList<>();

            // Parse GraphQL response to a list of sensors
            System.out.println(response.data);

            // Return sensor list
            return sensors;
        } else {
            throw new ProxyRequestFailException(response);
        }
    };
}
