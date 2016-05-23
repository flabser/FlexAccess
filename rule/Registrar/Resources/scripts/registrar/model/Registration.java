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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public GenderType getGender() {
		return gender;
	}

	public void setGender(GenderType gender) {
		this.gender = gender;
	}

	public Country getCitizenship() {
		return citizenship;
	}

	public void setCitizenship(Country citizenship) {
		this.citizenship = citizenship;
	}

	public String getDocNumber() {
		return docNumber;
	}

	public void setDocNumber(String docNumber) {
		this.docNumber = docNumber;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public Attachment getPhoto() {
		return photo;
	}

	public void setPhoto(Attachment photo) {
		this.photo = photo;
	}

}
