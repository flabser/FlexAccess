package flexaccess.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import flexaccess.model.Activity;

public class ApprovalDAO extends DAO<Activity, UUID> {

	public ApprovalDAO(_Session session) {
		super(Activity.class, session);
	}

}
