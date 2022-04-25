package backend.model.sensor;

/**
 * This class represents a position on the board with a string value that defines the position id.
 */
public enum Position {
    TOP_RIGHT ("TOP_RIGHT"),
    TOP_LEFT("TOP_LEFT"),
    MIDDLE_LEFT("MIDDLE_LEFT"),
    MIDDLE_RIGHT("MIDDLE_RIGHT"),
    BOTTOM_LEFT("BOTTOM_LEFT"),
    BOTTOM_RIGHT("BOTTOM_RIGHT"),
    GLOBAL("GLOBAL");

    final String ID;
    Position (String positionId) {
        this.ID = positionId;
    }
}
