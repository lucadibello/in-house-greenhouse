package com.inhousegreenhouse.ch.backend.model.greenhouse.dht;

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
        // Create data array
        int[] data = new int[5];
        data[0] = data[1] = data[2] = data[3] = data[4] = 0;

        // Save last state
        int shiftCount = 0;
        int lastState = 0;
        int counter;

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
            counter = 0; // Reset counter

            while (Gpio.digitalRead(pin.getAddress()) == lastState) {
                counter++;
                Gpio.delayMicroseconds(8);
                if (counter == 255) break;
            }

            lastState = Gpio.digitalRead(pin.getAddress());
            if (counter == 255) break;

            //
            // Inserts manually 1 if the state has changed
            if (i >= 4 && i % 2 == 0) {
                // Build each byte, starting from the first one (skip the first 4 bits) and every 8 bits (1 byte)
                int byteIndex = shiftCount / 8;
                data[byteIndex] = data[byteIndex] << 1;

                if (counter > 16) {
                    data[shiftCount / 8] |= 1;
                }
                System.out.println(data[0]);
                // System.out.println("INDEX: " + shiftCount / 8);
                ++shiftCount;
            }
        }

        // Fourth phase: verify checksum
        if (shiftCount != 40) {
            // Print data
            int checksum = data[0] + data[1] + data[2] + data[3] & 0xFF;
            if (checksum == data[4]) {
                float humidity = (float) data[0] + (float) data[1] / 10;
                float temperature = (float) data[2] + (float) data[3] / 10;
                System.out.println("Humidity: " + humidity + " %");
                System.out.println("Temperature: " + temperature + " °C");
            } else {
                System.out.println("Checksum failed: " + checksum + " != " + data[4]);
            }
        } else {
            System.out.println("Data not read completely!");
        }
    }

    public void collectSensorData (int attempts) {
        int unchangedCount = 0;

        int last = -1;
        while (unchangedCount < attempts) {
            // Read data from sensor
            int current = Gpio.digitalRead(pin.getAddress());

            if (last != current) {
                System.out.println("DIGITAL OUTPUT: " + current + " " + last);
                unchangedCount = 0;
                last = current;
            } else {
                unchangedCount++;
            }
        }
    }
}
