package stock.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SecureAppEntity;

@Entity
@Table(name = "units")
@NamedQuery(name = "Unit.findAll", query = "SELECT m FROM Unit AS m ORDER BY m.regDate")
public class Unit extends SecureAppEntity<UUID> {

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
