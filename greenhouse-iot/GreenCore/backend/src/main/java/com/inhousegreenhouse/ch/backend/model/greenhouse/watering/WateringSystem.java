package com.inhousegreenhouse.ch.backend.model.greenhouse.watering;

import com.pi4j.io.gpio.*;

/**
 * This class represents the watering system of the greenhouse.
 */
public class WateringSystem {

    /**
     * The GPIO pin that controls the watering system.
     */
    private final GpioPinDigitalOutput wateringPin;

    /**
     * Constructs a new WateringSystem.
     * @param pin The GPIO pin that controls the watering system.
     */
    public WateringSystem (Pin pin) {
        // create gpio controller
        final GpioController gpio = GpioFactory.getInstance();

        // provision gpio pin #01 as an output pin and turn on
        wateringPin = gpio.provisionDigitalOutputPin(pin, "WaterPump", PinState.LOW);

        // set shutdown state for this pin to low
        wateringPin.setShutdownOptions(true, PinState.LOW);
    }

    /**
     * Turns the watering system on.
     */
    public void turnOn() {
        wateringPin.high();
    }

    /**
     * Turns the watering system off.
     */
    public void turnOff() {
        wateringPin.low();
    }

    /**
     * Turns the watering system on for a certain amount of time (ms).
     * @param milliseconds The amount of time (ms) to turn the watering system on for.
     */
    public void turnOnFor(int milliseconds) {
        turnOn();
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        turnOff();
    }

    /**
     * Toggle the watering system: if it is on, turn it off, and vice versa.
     */
    public void toggle() {
        if (wateringPin.isHigh()) {
            turnOff();
        } else {
            turnOn();
        }
    }
}
