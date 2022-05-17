package com.inhousegreenhouse.ch.backend.model.raspberry.dht;

public class DHT11Result {
    // DHT11 sensor result returned by DHT11.read() method

    public static final int ERR_NO_ERROR = 0;
    public static final int ERR_MISSING_DATA = 1;
    public static final int ERR_CRC = 2;

    private final int errorCode;
    private final double temperature;
    private final double humidity;
    private final int listElements;
    private final int detectedBits;

    public DHT11Result(int errorCode, double temperature, double humidity, int listElements, int detectedBits) {
        this.errorCode   = errorCode;
        this.temperature = temperature;
        this.humidity    = humidity;

        this.listElements = listElements;
        this.detectedBits = detectedBits;
    }

    public boolean isValid() {
        return errorCode == ERR_NO_ERROR;
    }
    public int getErrorCode() {
        return errorCode;
    }
    public double getTemperature() {
        return temperature;
    }
    public double getHumidity() {
        return humidity;
    }
    double getListElements() {
        return listElements;
    }
    double getDetectedBits() {
        return detectedBits;
    }
}
