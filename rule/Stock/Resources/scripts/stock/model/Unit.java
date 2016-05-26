package stock.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SecureAppEntity;

//import reference.model.UnitType;

@Entity
@Table(name = "units")
@NamedQuery(name = "Unit.findAll", query = "SELECT m FROM Unit AS m ORDER BY m.regDate")
public class Unit extends SecureAppEntity<UUID> {

	/*
	 * private UnitType cat;
	 * 
	 * private String name;
	 * 
	 * private String rfid;
	 * 
	 * public String getRfid() { return rfid; }
	 * 
	 * public void setRfid(String rfid) { this.rfid = rfid; }
	 * 
	 * public String getName() { return name; }
	 * 
	 * public void setName(String name) { this.name = name; }
	 */
}
