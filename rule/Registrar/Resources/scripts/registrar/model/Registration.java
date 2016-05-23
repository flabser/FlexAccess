package registrar.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;

import reference.model.Country;
import registrar.model.constants.GenderType;

@Entity
@Table(name = "registrations")
@NamedQuery(name = "Registration.findAll", query = "SELECT m FROM Registration AS m ORDER BY m.regDate")
public class Registration extends SecureAppEntity<UUID> {

	private String rfid;

	private String firstName;

	private String lastName;

	private Date birthDay;

	private GenderType gender;

	private Country citizenship;

	private String docNumber;

	private Date expirationDate;

	private Attachment photo;

	public String getRfid() {
		return rfid;
	}

	public void setRfid(String rfid) {
		this.rfid = rfid;
	}

}
