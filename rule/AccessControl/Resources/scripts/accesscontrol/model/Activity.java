package accesscontrol.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SecureAppEntity;

@Entity
@Table(name = "activities")
@NamedQuery(name = "Activity.findAll", query = "SELECT m FROM Activity AS m ORDER BY m.regDate")
public class Activity extends SecureAppEntity<UUID> {

	private String rfid;

	private Date time;

	public String getRfid() {
		return rfid;
	}

	public void setRfid(String rfid) {
		this.rfid = rfid;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

}
