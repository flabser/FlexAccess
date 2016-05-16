package flexaccess.services;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;

import flexaccess.dao.ActivityDAO;
import flexaccess.model.Activity;

@Path("/")
public class Service extends RestProvider {

	@POST
	@Path("/postactivity/{rfid}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response postActivity(@PathParam("rfid") String rfid, MultivaluedMap<String, String> formParams) {
		Activity entity = new Activity();
		entity.setRfid(rfid);
		entity.setTime(new Date());
		ActivityDAO aDao = new ActivityDAO(getSession());
		try {
			aDao.add(entity);
			return Response.status(HttpServletResponse.SC_OK).entity(entity).build();
		} catch (SecureException e) {
			return Response.status(HttpServletResponse.SC_FORBIDDEN).build();
		}

	}

}
