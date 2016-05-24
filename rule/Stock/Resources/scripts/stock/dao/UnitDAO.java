package stock.dao;

import java.util.UUID;

import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.scripting._Session;

import stock.model.Unit;

public class UnitDAO extends DAO<Unit, UUID> {

	public UnitDAO(_Session session) {
		super(Unit.class, session);
	}

}
