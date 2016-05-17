package flexaccess.page.view;

import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import flexaccess.dao.ActivityDAO;

public class ActivityView extends AbstractFlexAccessView {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        addContent(getViewPage(new ActivityDAO(session), formData));
    }

    @Override
    public void doDELETE(_Session session, _WebFormData formData) {

    }
}
