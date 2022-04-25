package core.sequence;

import backend.exception.CriticalGreenhouseError;

public interface IGreenhouseSequence {
    void run() throws CriticalGreenhouseError;
}
