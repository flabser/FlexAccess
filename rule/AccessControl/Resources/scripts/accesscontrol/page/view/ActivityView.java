package accesscontrol.page.view;

import java.util.Date;

import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

import accesscontrol.dao.ActivityDAO;
import accesscontrol.model.Activity;

public class ActivityView extends _DoPage {

	@Override
	public void doGET(_Session session, _WebFormData formData) {
		ActivityDAO activityDAO = new ActivityDAO(session);

		int pageNum = formData.getNumberValueSilently("page", 1);
		int pageSize = session.getPageSize();

		String docid = formData.getValueSilently("docid");
		String rfid = formData.getValueSilently("rfid").toLowerCase();
		Date timeFrom = formData.getDateSilently("timeFrom");
		Date timeTo = formData.getDateSilently("timeTo");
		Date timeInterval[] = { timeFrom, timeTo };

		if (!rfid.isEmpty()) {
			ViewPage<Activity> result = activityDAO.findByRFId(rfid, pageNum, pageSize);
			addContent(new _POJOListWrapper<>(result.getResult(), result.getMaxPage(), result.getCount(), result.getPageNum(), session));
		} else {
			addContent(getViewPage(activityDAO, formData));
		}
	}
}
