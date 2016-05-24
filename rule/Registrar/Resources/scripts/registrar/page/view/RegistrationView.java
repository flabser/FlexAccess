package registrar.page.view;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import registrar.dao.RegistrationDAO;

import java.util.Date;

public class RegistrationView extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        RegistrationDAO registrationDAO = new RegistrationDAO(session);

        String docid = formData.getValueSilently("docid");
        String rfid = formData.getValueSilently("rfid").toLowerCase();
        Date timeFrom = formData.getDateSilently("timeFrom");
        Date timeTo = formData.getDateSilently("timeTo");
        Date timeInterval[] = {timeFrom, timeTo};

        addContent(getViewPage(registrationDAO, formData));
    }
}
