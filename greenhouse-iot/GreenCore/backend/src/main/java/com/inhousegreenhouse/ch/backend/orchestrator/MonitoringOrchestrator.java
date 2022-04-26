package com.inhousegreenhouse.ch.backend.orchestrator;

import com.inhousegreenhouse.ch.backend.model.sensor.*;

import java.util.ArrayList;
import java.util.List;

public class MonitoringOrchestrator {
    public static volatile boolean isRunning = true;

    private final SensorList sensorList;
    private final List<Thread> threadPool = new ArrayList<>();

    public MonitoringOrchestrator(SensorList sensorList) {
        this.sensorList = sensorList;
    }

    public void startMonitoring (MonitoringConfig config) {
        // Initialize the thread pool
        threadPool.addAll(initializeThreadPool(config));

        // Start all threads
        System.out.println("[!] Starting individual sensor monitoring...");
        for (Thread thread : threadPool) {
            thread.start();
        }
        System.out.println("[!] ALl monitor threads have been notified to start successfully.");
    }

    private List<Thread> initializeThreadPool (MonitoringConfig config) {
        List<Thread> tempPool = new ArrayList<>();
        // Create a thread pool
        int counter = 0;
        for (TemperatureSensor sensor : sensorList.getTemperatureSensors()) {
            tempPool.add(new Thread(new SensorObserver<TemperatureSensor>(config, sensor, "TemperatureSensor-" + counter++)));
        }
        counter = 0;
        for (HumiditySensor sensor : sensorList.getHumiditySensors()) {
            tempPool.add(new Thread(new SensorObserver<HumiditySensor>(config, sensor, "HumiditySensor-" + counter++)));
        }
        counter = 0;
        for (MoistureSensor sensor : sensorList.getMoistureSensors()) {
            tempPool.add(new Thread(new SensorObserver<MoistureSensor>(config, sensor, "MoistureSensor-" + counter++)));
        }

        // Return the thread pool
        return tempPool;
    }

    public void stopMonitoring () {
        isRunning = false;
    }
}
