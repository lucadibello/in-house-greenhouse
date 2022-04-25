package backend.repository;

import backend.exception.ProxyRequestFailException;
import backend.exception.RepositoryLoadException;
import backend.model.api.GreenhouseApi;
import backend.model.util.Greenhouse;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;

public class GreenhouseRepository implements IRepository {

    /**
     * The Greenhouse model object.
     */
    private Greenhouse greenhouse;

    @Override
    public void load() throws RepositoryLoadException {
        // Get uuid file from properties
        try {
            String filePath = Objects.requireNonNull(GreenhouseRepository.class.getClassLoader().getResource("greenhouse.uuid")).getPath();

            // Check if file exists
            if (Files.exists(Paths.get(filePath))) {
                // Convert to JSON object
                JSONObject obj = new JSONObject(new String(Files.readAllBytes(Paths.get(filePath))));

                // Get uuid
                String savedUuid = obj.getString("uuid");
                String savedName = obj.getString("name");
                String savedDescription = obj.getString("description");

                // Check if uuid is valid
                if (savedUuid.length() != 36 || !savedUuid.matches("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")) {
                    // Throw exception to notify that this greenhouse needs to be registered
                    throw new RepositoryLoadException("Invalid uuid, register new greenhouse to APIs");
                } else {
                    // save uuid to class variable
                    this.greenhouse = new Greenhouse(
                            savedUuid,
                            savedName,
                            savedDescription
                    );
                }
            } else {
                throw new RepositoryLoadException("Uuid file not found");
            }
        } catch (NullPointerException e) {
            throw new RepositoryLoadException("Missing greenhouse.uuid property file. Please, try to compile again.");
        } catch (IOException e) {
            throw new RepositoryLoadException("Repository not initialized");
        }
    }

    public void addGreenhouse (String name, String description, String userToken) throws ProxyRequestFailException, RepositoryLoadException {
        GreenhouseApi api = new GreenhouseApi(userToken);
        this.greenhouse = api.registerGreenhouse(name, description);

        System.out.println("[!] Greenhouse registered successfully!");
        System.out.println("[!] UUID: " + this.greenhouse.getId());
        System.out.println("[!] Name: " + this.greenhouse.getName());
        System.out.println("[!] Description: " + this.greenhouse.getDescription());

        // Save data to file
        try {
            String filePath = Objects.requireNonNull(GreenhouseRepository.class.getClassLoader().getResource("greenhouse.uuid")).getPath();
            JSONObject obj = new JSONObject();
            obj.put("uuid", this.greenhouse.getId());
            obj.put("name", this.greenhouse.getName());
            obj.put("description", this.greenhouse.getDescription());
            Files.write(Paths.get(filePath), obj.toString().getBytes());
        } catch (IOException e) {
            throw new RepositoryLoadException("Cannot save data to file");
        }
    }

    public Greenhouse getGreenhouse() {
        return greenhouse;
    }
}
