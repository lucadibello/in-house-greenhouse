package com.inhousegreenhouse.ch.backend.model.rasp.dht;

import com.pi4j.io.gpio.*;
import com.pi4j.wiringpi.Gpio;
import com.pi4j.wiringpi.GpioUtil;

import java.util.LinkedList;
import java.util.List;

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

        int last = -1;
        List<Integer> data = new LinkedList<>();

        // First phase: start pulse
        sendLow();
        Gpio.delay(18);
        sendHigh();

        // Second phase: wait for response
        Gpio.pinMode(pin.getAddress(), Gpio.INPUT);

        // Third phase: read data
        for (int i = 0; i < 100; i++) {
            collectSensorData(i);
        }
    }

    public void collectSensorData (int attempts) {
        int unchangedCount = 0;
        final int MAX_UNCHANGED_COUNT = 100;
        int last = -1;
        while (unchangedCount < MAX_UNCHANGED_COUNT) {
            // Read data from sensor
            int current = Gpio.digitalRead(pin.getAddress());
            if (current == 1) {
                System.out.println("DATA: " + attempts);
            }
            // data.add(current);

            if (last != current) {
                unchangedCount = 0;
                last = current;
            } else {
                unchangedCount++;
            }
        }
    }

    public void sendHigh () {
        Gpio.digitalWrite(pin.getAddress(), Gpio.HIGH);
    }

    public void sendLow () {
        Gpio.digitalWrite(pin.getAddress(), Gpio.LOW);
    }
}
