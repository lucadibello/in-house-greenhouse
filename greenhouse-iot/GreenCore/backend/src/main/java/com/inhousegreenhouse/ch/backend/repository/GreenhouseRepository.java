package com.inhousegreenhouse.ch.backend.repository;

import com.inhousegreenhouse.ch.backend.exception.ProxyRequestFailException;
import com.inhousegreenhouse.ch.backend.exception.RepositoryLoadException;
import com.inhousegreenhouse.ch.backend.model.api.GreenhouseApi;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * A GreenhouseRepository is a repository that manage data related to the current Greenhouse.
 */
public class GreenhouseRepository implements IRepository {

    /**
     * The Greenhouse model object.
     */
    private Greenhouse greenhouse;

   /**
     * The repository file path.
     */
    private final Path repositoryPath;

    /**
     * Constructor.
     * @param repositoryPath The repository path.
     */
    public GreenhouseRepository(String repositoryPath) {
        this.repositoryPath = Paths.get(repositoryPath);
    }

    /**
     * Initialize an empty repository.
     */
    public boolean initializeRepository () throws RepositoryLoadException {
        // Create user repository if not exists
        File greenRepository = repositoryPath.toFile();

        // Check if repository directory already exists
        if (!greenRepository.getParentFile().exists()) {
            // Create directories
            if (!greenRepository.getParentFile().mkdirs()) {
                return false;
            }
        }

        // Create user repository file and return status
        try {
            if (greenRepository.createNewFile()) {

                // Create JSON object using data from annotation
                final JSONObject jsonObject = new JSONObject();

                // Add default data to JSON object
                jsonObject.put("uuid", "");
                jsonObject.put("name", "");
                jsonObject.put("description", "");

                // Write JSON to file
                java.io.FileWriter writer = new java.io.FileWriter(greenRepository);
                writer.write(jsonObject.toString());
                writer.close();

                // notify success
                return true;
            } else {
                return false;
            }
        } catch (IOException e) {
            throw new RepositoryLoadException("Error while creating repository file");
        }
    }

    /**
     * Load the greenhouse from the repository.
     * @throws RepositoryLoadException If the repository cannot be loaded.
     */
    @Override
    public void load() throws RepositoryLoadException {
        // Get uuid file from properties
        try {
            // Check if file exists
            if (Files.exists(repositoryPath)) {
                // Convert to JSON object
                JSONObject obj = new JSONObject(new String(Files.readAllBytes(repositoryPath)));

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
        } catch (IOException e) {
            throw new RepositoryLoadException("Repository not initialized");
        }
    }

    /**
     * Register a new greenhouse to the API.
     * @param name The name of the greenhouse.
     * @param description The description of the greenhouse.
     * @param userToken The user token.
     * @throws ProxyRequestFailException If the request to the API fails.
     * @throws RepositoryLoadException If the repository is not initialized.
     */
    public void addGreenhouse (String name, String description, String userToken) throws ProxyRequestFailException, RepositoryLoadException {
        GreenhouseApi api = new GreenhouseApi(userToken);
        this.greenhouse = api.registerGreenhouse(name, description);

        System.out.println("[!] Greenhouse registered successfully!");
        System.out.println("[!] UUID: " + this.greenhouse.getId());
        System.out.println("[!] Name: " + this.greenhouse.getName());
        System.out.println("[!] Description: " + this.greenhouse.getDescription());

        // Save data to file
        try {
            JSONObject obj = new JSONObject();
            obj.put("uuid", this.greenhouse.getId());
            obj.put("name", this.greenhouse.getName());
            obj.put("description", this.greenhouse.getDescription());
            Files.write(repositoryPath, obj.toString().getBytes());
        } catch (IOException e) {
            throw new RepositoryLoadException("Cannot save data to file");
        }
    }

    /**
     * Get the locally saved greenhouse.
     * @return The locally saved greenhouse.
     */
    public Greenhouse getGreenhouse() {
        return greenhouse;
    }
}
