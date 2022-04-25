package backend.model.util;

import org.json.JSONObject;

import java.text.ParseException;

public class GreenhouseSetup {
    private final String name;
    private final String description;
    private final String token;

    public GreenhouseSetup (final String name, final String description, final String token) {
        this.name = name;
        this.description = description;
        this.token = token;
    }

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

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getToken() {
        return token;
    }
}
