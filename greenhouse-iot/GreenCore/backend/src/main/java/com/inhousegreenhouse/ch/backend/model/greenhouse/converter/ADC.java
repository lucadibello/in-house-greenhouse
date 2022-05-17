package com.inhousegreenhouse.ch.backend.model.sensor.converter;

import com.pi4j.io.spi.SpiChannel;
import com.pi4j.io.spi.SpiDevice;
import com.pi4j.io.spi.SpiFactory;

import java.io.IOException;

/**
 * This class represents the MCP3008 Analog-To-Digital Converter chip connected of the Raspberry Pi.
 */
public class ADC {

    /**
     * SPI interface used to communicate with the ADC chip.
     */
    private final SpiDevice spi;

    /**
     * The maximum number of channels available on the ADC chip.
     */
    public static short ADC_CHANNEL_COUNT = 8;

    /**
     * Constructor.
     * @throws IOException If the SPI interface cannot be opened.
     */
    public ADC () throws IOException {
        // Create SPI device
        spi = SpiFactory.getInstance(
            SpiChannel.CS0, // SPI channel selector output
            SpiDevice.DEFAULT_SPI_SPEED, // Default SPI speed, set at 1 MHz
            SpiDevice.DEFAULT_SPI_MODE // default SPI mode (set at 0)
        );
    }

    /**
     * Reads the value of the specified ADC channel.
     * @param channel The AdC channel to read.
     * @return The value of the specified ADC channel.
     * @throws IOException If the SPI interface cannot be opened.
     */
    public synchronized int read(int channel) throws IOException {
        // Check if channel is valid, otherwise throw an exception.
        if (channel < 0 || channel > ADC_CHANNEL_COUNT) {
            throw new IllegalArgumentException("Invalid channel number");
        }

        // create a data buffer and initialize a conversion request payload
        final byte[] data = new byte[] {
                (byte) 0b00000001,                              // first byte, start bit
                (byte)(0b10000000 |( ((channel & 7) << 4))),    // second byte transmitted -> (SGL/DIF = 1, D2=D1=D0=0)
                (byte) 0b00000000                               // third byte transmitted....don't care
        };

        // send data to the MCP3008 via the SPI bus
        byte[] result = spi.write(data);

        // Convert the result to an integer
        return (result[2] & 0xFF) | ((result[1] & 0xFF) << 8) | ((result[0] & 0x0F) << 16);
    }
}
