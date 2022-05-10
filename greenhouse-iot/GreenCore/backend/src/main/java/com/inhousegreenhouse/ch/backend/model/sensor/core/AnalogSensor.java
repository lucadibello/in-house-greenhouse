package com.inhousegreenhouse.ch.backend.model.sensor.core;

import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.util.Channels;

import java.io.IOException;

/**
 * This class represents an analog sensor and is used to read the analog value of the sensor.
 * @param <T> Type of data read from the sensor.
 */
public abstract class AnalogSensor<T extends Number> extends BaseSensor<T> {

    /**
     * Channel manager
     */
    public static final Channels channels = new Channels(8);

    /**
     * ADC object used to read the analog value of the sensor.
     */
    private final ADC adc;

    /**
     * Channel where the sensor is connected.
     */
    private final int channel;

    /**
     * Set the sensor value.
     *
     * @param nameId         The sensor name.
     * @param sensorPosition The sensor position inside the greenhouse.
     * @param defaultValue   The sensor default value.
     * @param adc            The ADC to use.
     * @param channel        The channel to use.
     */
    public AnalogSensor(String nameId, Position sensorPosition, T defaultValue, ADC adc, final int channel) {
        // Build the sensor
        super(nameId, sensorPosition, defaultValue);
        // Set the ADC
        this.adc = adc;
        // Set the channel
        this.channel = channel;
    }

    /**
     * Read the digital value of the sensor, that the AdC has converted.
     * @return The digital value of the sensor.
     * @throws IOException If there is an error reading the sensor.
     */
    protected int getConversionData() throws IOException {
        return adc.read(channel);
    }

    /**
     * Get the channel where the sensor is connected.
     * @return The channel where the sensor is connected.
     */
    public int getChannel() {
        return channel;
    }
}
