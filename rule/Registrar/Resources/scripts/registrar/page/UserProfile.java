package registrar.page;

import administrator.dao.LanguageDAO;
import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.localization.LanguageCode;
import com.exponentus.scripting.*;
import com.exponentus.scripting.event._DoPage;
import com.exponentus.user.IUser;
import reference.model.Position;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.Date;

public class UserProfile extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        IUser<Long> user = session.getUser();
        EmployeeDAO dao = new EmployeeDAO(session);
        Employee emp = dao.findByUserId(user.getId());
        if (emp == null) {
            emp = new Employee();
            emp.setRegDate(new Date());
            User userObj = new User();
            userObj.setUserName(user.getUserName());
            userObj.setLogin(user.getLogin());
            Position tmpPos = new Position();
            tmpPos.setName("");
            emp.setPosition(tmpPos);
            emp.setUser(userObj);
            emp.setName(user.getLogin());
        }
        addContent(emp);
        addContent(new _POJOListWrapper(new LanguageDAO(session).findAll(), session));
        addContent("pagesize", String.valueOf(session.getPageSize()));
    }

    @Override
    public void doPOST(_Session session, _WebFormData formData) {
        try {
            _Validation ve = validate(formData, session.getLang());
            if (ve.hasError()) {
                setBadRequest();
                setValidation(ve);
                return;
            }

            IUser<Long> user = session.getUser();
            UserDAO dao = new UserDAO(session);
            User entity = dao.findById(user.getId());

            entity.setLogin(formData.getValue("login"));
            entity.setEmail(formData.getValue("email"));
            if (!formData.getValueSilently("pwd").isEmpty()) {
                entity.setPwd(formData.getValue("pwd"));
            }
            dao.update(entity);
        } catch (_Exception e) {
            error(e);
        }
    }

    private _Validation validate(_WebFormData formData, LanguageCode lang) {
        _Validation ve = new _Validation();

        if (formData.getValueSilently("login").isEmpty()) {
            ve.addError("login", "required", getLocalizedWord("required", lang));
        }
        if (formData.getValueSilently("email").isEmpty() || !_Validator.checkEmail(formData.getValueSilently("email"))) {
            ve.addError("email", "email", getLocalizedWord("email_invalid", lang));
        }
        if (!formData.getValueSilently("pwd").isEmpty()) {
            if (formData.getValueSilently("pwd_confirm").isEmpty()) {
                ve.addError("pwd_confirm", "required", getLocalizedWord("required", lang));
            } else if (!formData.getValueSilently("pwd").equals(formData.getValueSilently("pwd_confirm"))) {
                ve.addError("pwd_confirm", "required", getLocalizedWord("password_confirm_not_equals", lang));
            }
        }

        return ve;
    }
}
