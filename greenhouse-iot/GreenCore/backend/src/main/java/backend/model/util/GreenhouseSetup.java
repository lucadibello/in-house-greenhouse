package backend.model.util;

import org.json.JSONObject;

import java.text.ParseException;

/**
 * GreenhouseSetup is a class that represents data necessary for the setup of a greenhouse.
 */
public class GreenhouseSetup {
    /**
     * The name of the greenhouse.
     */
    private final String name;

    /**
     * The description of the greenhouse.
     */
    private final String description;

    /**
     * The access token that will be used to register the greenhouse inside the API server.
     */
    private final String token;

    /**
     * Constructor for GreenhouseSetup.
     * @param name The name of the greenhouse.
     * @param description The description of the greenhouse.
     * @param token The access token that will be used to register the greenhouse inside the API server.
     */
    public GreenhouseSetup (final String name, final String description, final String token) {
        this.name = name;
        this.description = description;
        this.token = token;
    }

    /**
     * Converts a JSON to a GreenhouseSetup object.
     * @param json The JSONObject to be converted.
     * @return The GreenhouseSetup object.
     * @throws ParseException Thrown if the JSON data is missing or not valid.
     */
    public static GreenhouseSetup fromJson (JSONObject json) throws ParseException {
        try {
            // Get data from JSON
            String greenName = json.getString("name");
            String greenDesc = json.getString("description");
            String accessToken = json.getString("token");

            // Check if required data is valid
            if (greenName == null || greenName.isEmpty()) {
                throw new ParseException("Invalid Greenhouse name", 0);
            } else if (accessToken == null || accessToken.isEmpty()) {
                throw new ParseException("Invalid access token", 2);
            }


            // Return new GreenhouseSetup object
            return new GreenhouseSetup(greenName, greenDesc, accessToken);
        } catch (Exception e) {
            throw new ParseException(e.getMessage(), 0);
        }
    }

    /**
     * Returns the name of the greenhouse.
     * @return The name of the greenhouse.
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the description of the greenhouse.
     * @return The description of the greenhouse.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Returns the access token that will be used to register the greenhouse inside the API server.
     * @return The access token that will be used to register the greenhouse inside the API server.
     */
    public String getToken() {
        return token;
    }
}
