package flexaccess.init;

import com.exponentus.dataengine.jpa.deploying.InitialDataAdapter;
import com.exponentus.localization.LanguageCode;
import com.exponentus.localization.Vocabulary;
import com.exponentus.scripting._Session;
import flexaccess.dao.ActivityDAO;
import flexaccess.model.Activity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FillActivities extends InitialDataAdapter<Activity, ActivityDAO> {

    @Override
    public List<Activity> getData(_Session ses, LanguageCode lang, Vocabulary vocabulary) {
        List<Activity> entities = new ArrayList<>();

        Activity entity = new Activity();
        entity.setRfid("rfid-" + new Date());
        entity.setTime(new Date());
        entities.add(entity);

        return entities;
    }
}
