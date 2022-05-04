package com.inhousegreenhouse.ch.backend.controller;

import com.inhousegreenhouse.ch.backend.exception.SpiCannotBeInitializedException;
import com.inhousegreenhouse.ch.backend.model.sensor.converter.ADC;
import com.inhousegreenhouse.ch.backend.model.sensor.core.SensorList;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.repository.SensorRepository;
import com.inhousegreenhouse.ch.backend.service.SensorService;

import java.io.IOException;

public class SensorController {

    private final SensorService sensorService;

    public SensorController (Greenhouse greenhouse) throws SpiCannotBeInitializedException {
        try {
            ADC adc = new ADC();
            this.sensorService = new SensorService(new SensorRepository(greenhouse, adc));
        } catch (IOException e) {
            throw new SpiCannotBeInitializedException("SPI cannot be initialized: " + e.getMessage());
        }
    }

    public SensorList getSensors () {
        return sensorService.getSensors();
    }
}
