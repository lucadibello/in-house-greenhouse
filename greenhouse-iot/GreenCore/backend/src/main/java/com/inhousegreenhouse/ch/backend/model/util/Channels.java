package com.inhousegreenhouse.ch.backend.model.util;


import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorType;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Objects;
import java.util.Queue;

/**
 * A utility class used to assign channels to sensors.
 */
public class Channels {
    /**
     * Registers the reserved channels for every added sensor type.
     */
    private final HashMap<SensorType, Queue<Integer>> channels = new HashMap<>();

    /**
     * Maximum number of channels.
     */
    private static int maxChannels = 8;

    /**
     * Constructor.
     * @param numberOfChannels the number of channels to be used
    */
    public Channels(int numberOfChannels) {
        maxChannels = numberOfChannels;
    }

    /**
     * Default constructor.
     */
    public Channels () {
    }

    /**
     * Register a sensor with the channel manager.
     * @param type the sensor type
     * @param startChannel the start channel
     * @param endChannel the end channel
     * @throws IllegalArgumentException if was passed a sensor type that is already registered or if channel are messed up
     */
    public void registerSensor(SensorType type, int startChannel, int endChannel) throws IllegalArgumentException {
        if (startChannel > endChannel) {
            throw new IllegalArgumentException("Start channel must be smaller than end channel.");
        } else if (startChannel < 0) {
            throw new IllegalArgumentException("Channels must be positive.");
        } else if (startChannel > maxChannels || endChannel > maxChannels) {
            throw new IllegalArgumentException("Channels must be smaller than " + maxChannels + ".");
        }

        // Check if the sensor is already registered
        if (channels.containsKey(type)) {
            throw new IllegalArgumentException("Sensor is already registered.");
        }

        // check if there are enough channels
        if (endChannel - startChannel + 1 > maxChannels) {
            throw new IllegalArgumentException("Not enough channels.");
        }

        // Register the sensor with a linked list containing the channels from startChannel to endChannel
        Queue<Integer> channelList = new LinkedList<>();
        for (int i = startChannel; i <= endChannel; i++) {
            channelList.add(i);
        }
        channels.put(type, channelList);
    }


    /**
     * Set the maximum number of channels.
     */
    public void changeMaxNumberOfChannels(int numberOfChannels) {
        maxChannels = numberOfChannels;
    }

    /**
     * Get the next channel for a sensor type.
     * @param type the sensor type
     * @return the next channel
     * @throws IllegalCallerException if the sensor type is not registered
     * @throws NullPointerException if the there are any more channels registered for the sensor type
     */
    public int getNextChannel(SensorType type) throws NullPointerException, IllegalCallerException {
        // Check if the sensor is registered
        if (!channels.containsKey(type)) {
            throw new IllegalCallerException("Sensor is not registered.");
        }

        // Get the next channel from the linked list
        return Objects.requireNonNull(channels.get(type).poll());
    }
}
