package com.inhousegreenhouse.ch.backend.model.sensor.core;

import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;

import java.io.IOException;

public abstract class AnalogSensor<T extends Number> extends BaseSensor<T> {

    private final ADC adc;
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

    protected int getConversionData() throws IOException {
        return adc.read(channel);
    }
}
