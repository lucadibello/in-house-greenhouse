package core.sequence;

public abstract class Sequence {
    private final String sequenceName;

    public Sequence(String sequenceName) {
        this.sequenceName = sequenceName;
    }

    public String getSequenceName() {
        return sequenceName;
    }
}
