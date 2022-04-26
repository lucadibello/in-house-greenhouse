package core.sequence;

/**
 * A base class that defines the basic attributes of a sequence of the greenhouse.
 */
public abstract class Sequence {

    /**
     * The name of the sequence.
     */
    private final String sequenceName;

    /**
     * The sequence of the greenhouse.
     * @param sequenceName the name of the sequence.
     */
    public Sequence(String sequenceName) {
        this.sequenceName = sequenceName;
    }

    /**
     * Returns the name of the sequence.
     * @return the name of the sequence.
     */
    public String getSequenceName() {
        return sequenceName;
    }
}
