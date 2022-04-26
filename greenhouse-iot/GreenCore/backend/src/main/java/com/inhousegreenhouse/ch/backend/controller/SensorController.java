package com.inhousegreenhouse.ch.backend.controller;

import com.inhousegreenhouse.ch.backend.model.sensor.SensorList;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.repository.SensorRepository;
import com.inhousegreenhouse.ch.backend.service.SensorService;

public class SensorController {

    private final SensorService sensorService;

    public SensorController (Greenhouse greenhouse) {
        this.sensorService = new SensorService(new SensorRepository(greenhouse));
    }

    public SensorList getSensors () {
        return sensorService.getSensors();
    }
}
