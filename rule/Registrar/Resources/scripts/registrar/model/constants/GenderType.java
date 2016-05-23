package registrar.model.constants;

public enum GenderType {
	UNKNOWN(0), MALE(12), FEMALE(13);

	private int code;

	GenderType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static GenderType getType(int code) {
		for (GenderType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
