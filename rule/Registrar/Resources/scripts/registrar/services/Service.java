package registrar.services;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.common.model.Attachment;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.pojo.Outcome;
import com.exponentus.rest.pojo.ServerServiceExceptionType;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import com.exponentus.util.Util;

import reference.dao.CountryDAO;
import reference.model.Country;
import registrar.dao.RegistrationDAO;
import registrar.model.Registration;
import registrar.model.constants.GenderType;

@Path("/")
public class Service extends RestProvider {

	@GET
	@Path("register/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@PathParam("id") long id) {
		_Session ses = getSession();
		Registration entity = new Registration();
		entity.setBirthDay(new Date());
		CountryDAO cDao = new CountryDAO(ses);
		entity.setCitizenship((Country) Util.getRndListElement(cDao.findAll()));
		entity.setDocNumber(StringUtil.getRandomText());
		entity.setEditable(true);
		entity.setExpirationDate(new Date());
		entity.setFirstName("some first name");
		entity.setLastName("some last name");
		entity.setGender(GenderType.MALE);
		entity.setPhoto(new Attachment());
		entity.setRfid(StringUtil.getRandomText());
		entity.setWasRead(true);
		return Response.ok(entity).build();

	}

	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	public Response register(Registration reg) {
		_Session ses = getSession();
		Registration entity = new Registration();

		RegistrationDAO aDao = new RegistrationDAO(ses);
		Outcome outcome = new Outcome();
		try {
			aDao.add(entity);
			return Response.status(HttpServletResponse.SC_OK).entity(outcome).build();
		} catch (SecureException e) {
			outcome.setMessage(e, ServerServiceExceptionType.SERVER_ERROR, ses.getLang());
			return Response.status(HttpServletResponse.SC_FORBIDDEN).build();
		}

	}

}
