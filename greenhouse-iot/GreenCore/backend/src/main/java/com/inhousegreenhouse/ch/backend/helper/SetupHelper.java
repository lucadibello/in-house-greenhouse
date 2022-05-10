package com.inhousegreenhouse.ch.backend.helper;

import com.inhousegreenhouse.ch.backend.model.util.GreenhouseSetup;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.Scanner;

/**
 * This class is used to help the app SetupSequence to fetch the greenhouse settings from the user.
 * The user, through a socket connection, will send the settings to the app, and this class will handle all the process
 * behind the scene.
 */
public class SetupHelper {

    /**
     * Flag to indicate if the settings socket is open.
     */
    private boolean isRunning = true;

    /**
     * Close the socket connection.
     */
    public void stop () {
        isRunning = false;
    }

    /**
     * Start the socket connection and wait for user settings.
     * @param port The port to listen on.
     * @return The greenhouse settings, sent by the user.
     */
    public GreenhouseSetup waitServerData (int port) {
        try {
            // Create server socket on port
            ServerSocket server = new ServerSocket(port);

            // Notify the user that the socket is open
            System.out.println("[*] Setup socket now reachable at: " + server.getInetAddress() + ":" + server.getLocalPort());

            // Keep socket open until the setup socket receives valid data
            while (isRunning) {
                System.out.println("[?] Waiting new client to connect...");

                // Wait for a connection
                Socket client = server.accept();

                // Notify the user that a connection has been made
                System.out.println();
                System.out.println("----> Client connected from: " + client.getInetAddress() + ":" + client.getPort());

                // Get the input stream and output stream from the client
                InputStream in = client.getInputStream();
                OutputStream out = client.getOutputStream();

                // Read the data from the client
                Scanner s = new Scanner(in, StandardCharsets.UTF_8);

                // Continue to ask for data until the user sends valid data
                String data;
                while (s.hasNextLine() && (data = s.nextLine()) != null) {
                    System.out.println("[*] Data received from client: " + data);

                    // Try to parse the data as a JSON object
                    try {
                        // Convert data string to JSONElement
                        JSONObject json = new JSONObject(data);

                        // Convert JSON to a GreenhouseSetup object
                        GreenhouseSetup setup = GreenhouseSetup.fromJson(json);

                        // Notify the user that the setup was successful
                        System.out.println("[!] Setup data received from client! I'm closing the setup socket...");

                        // Stop the setup socket
                        this.stop();
                        // Close server
                        server.close();
                        // Return the setup
                        return setup;
                    } catch (ParseException | JSONException e) {
                        System.out.println("[!] Data sent by user is not valid! Notifying user...");

                        // Build the error message object
                        JSONObject response = new JSONObject();
                        response.put("status", "error");
                        response.put("message", "Data sent by user is not valid!");

                        // Send a JSON string to the client
                        out.write(response.toString().getBytes(StandardCharsets.UTF_8));
                    }
                }
            }

            // Return null if user closes the setup socket before receiving valid data
            return null;
        } catch (IOException e) {
            throw new RuntimeException("The server socket could not be opened! " + e.getMessage());
        }
    }
}
