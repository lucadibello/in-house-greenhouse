package com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.core;

import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.HumiditySensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.MoistureSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.TemperatureSensor;
import com.inhousegreenhouse.ch.backend.model.greenhouse.sensor.WaterSensor;

import java.util.ArrayList;
import java.util.List;

/**
 * This class stores all the loaded sensors, where every sensor is sorted by its type in a own list.
 */
public class SensorList {
    /**
     * List of all available humidity sensors
     */
    private final List<HumiditySensor> humiditySensors = new ArrayList<>();

    /**
     * List of all available temperature sensors
     */
    private final List<TemperatureSensor> temperatureSensors = new ArrayList<>();

    /**
     * List of all available water sensors
     */
    private final List<WaterSensor> waterSensors = new ArrayList<>();

    /**
     * List of all available moisture sensors
     */
    private final List<MoistureSensor> moistureSensors = new ArrayList<>();

    /**
     * Add a humidity sensor to the list
     * @param s the humidity sensor to add
     */
    public void addHumiditySensor(HumiditySensor s) {
        this.humiditySensors.add(s);
    }

    /**
     * Add a temperature sensor to the list
     * @param t the temperature sensor to add
     */
    public void addTemperatureSensor (TemperatureSensor t) {
        this.temperatureSensors.add(t);
    }

    /**
     * Add a water sensor to the list
     * @param w the water sensor to add
     */
    public void addWaterSensor(WaterSensor w) {
        this.waterSensors.add(w);
    }

    /**
     * Add a moisture sensor to the list
     * @param m the moisture sensor to add
     */
    public void addMoistureSensor(MoistureSensor m) {
        this.moistureSensors.add(m);
    }

    /**
     * Get list of available humidity sensors
     * @return A list of Humidity sensor objects
     */
    public List<HumiditySensor> getHumiditySensors() {
        return humiditySensors;
    }

    /**
     * Get list of available temperature sensors
     * @return A list of Temperature sensor objects
     */
    public List<TemperatureSensor> getTemperatureSensors() {
        return temperatureSensors;
    }

    /**
     * Get list of available water sensors
     * @return A list of Water sensor objects
     */
    public List<WaterSensor> getWaterSensors() {
        return waterSensors;
    }

    /**
     * Get list of available moisture sensors
     * @return A list of Moisture sensor objects
     */
    public List<MoistureSensor> getMoistureSensors() {
        return moistureSensors;
    }


    /**
     * Total number of sensors
     * @return The total number of sensors
     */
    public int size () {
        return humiditySensors.size() + temperatureSensors.size() + waterSensors.size() + moistureSensors.size();
    }
}
