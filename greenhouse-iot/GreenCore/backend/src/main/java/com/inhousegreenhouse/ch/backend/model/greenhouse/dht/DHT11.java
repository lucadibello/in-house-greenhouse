package com.inhousegreenhouse.ch.backend.model.raspberry.dht;

import com.pi4j.io.gpio.*;
import com.pi4j.wiringpi.Gpio;
import com.pi4j.wiringpi.GpioUtil;

public class DHT11 {
    private final Pin pin;

    public DHT11 (Pin pin) {
        this.pin = pin;
        // setup wiringPi
        if (Gpio.wiringPiSetup() == -1) {
            throw new RuntimeException(" ==>> GPIO SETUP FAILED");
        }
    }

    public void read() {
        // Export port
        GpioUtil.export(pin.getAddress(), GpioUtil.DIRECTION_OUT);

        // Check if pin is exported
        if (!GpioUtil.isExported(pin.getAddress())) {
            throw new RuntimeException(" ==>> GPIO PIN NOT EXPORTED");
        }

        // Set pin mode to output
        Gpio.pinMode(pin.getAddress(), Gpio.OUTPUT);

        // First phase: start pulse
        Gpio.digitalWrite(pin.getAddress(), Gpio.LOW);
        Gpio.delay(18);
        Gpio.digitalWrite(pin.getAddress(), Gpio.HIGH);
        Gpio.delayMicroseconds(40);

        // Second phase: wait for response
        Gpio.pinMode(pin.getAddress(), Gpio.INPUT);

        // Third phase: read data
        for (int i = 0; i < 85; i++) {
            collectSensorData(i);
        }
    }

    public void collectSensorData (int attempts) {
        int unchangedCount = 0;

        int last = -1;
        while (unchangedCount < attempts) {
            // Read data from sensor
            System.out.println(pin.getAddress());
            int current = Gpio.digitalRead(pin.getAddress());
            System.out.println("DIGITAL OUTPUT: " +current);

            if (last != current) {
                unchangedCount = 0;
                last = current;
            } else {
                unchangedCount++;
            }
        }
    }
}
