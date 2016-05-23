package registrar.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import registrar.model.Registration;

public class RegistrationDAO extends DAO<Registration, UUID> {

	public RegistrationDAO(_Session session) {
		super(Registration.class, session);
	}

}
