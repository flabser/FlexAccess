package flexaccess.model;

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

}
