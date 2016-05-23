package registrar.services;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.pojo.Outcome;
import com.exponentus.rest.pojo.ServerServiceExceptionType;
import com.exponentus.scripting._Session;

import registrar.dao.RegistrationDAO;
import registrar.model.Registration;

@Path("/")
public class Service extends RestProvider {

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
