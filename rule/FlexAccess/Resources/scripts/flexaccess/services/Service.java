package flexaccess.services;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.rest.RestProvider;

@Path("fa")
public class Service extends RestProvider {

	@POST
	@Path("/postactivity/{rfid}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@PathParam("coord") String coord) {
		System.out.println("coordinates = " + coord);

		return Response.ok().build();
	}

}
