package stock.dao;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;

import flexaccess.model.Activity;

public class ActivityDAO extends DAO<Activity, UUID> {

	public ActivityDAO(_Session session) {
		super(Activity.class, session);
	}

	public ViewPage<Activity> findByRFId(String rfid, int pageNum, int pageSize) {
		EntityManager em = getEntityManagerFactory().createEntityManager();
		CriteriaBuilder cb = em.getCriteriaBuilder();
		try {
			CriteriaQuery<Activity> cq = cb.createQuery(entityClass);
			CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
			Root<Activity> c = cq.from(entityClass);
			cq.select(c);
			countCq.select(cb.count(c));

			Predicate condition = cb.like(cb.lower(c.<String> get("rfid")), "%" + rfid + "%");
			cq.orderBy(cb.asc(c.get("regDate")));
			cq.where(condition);
			countCq.where(condition);
			TypedQuery<Activity> typedQuery = em.createQuery(cq);
			Query query = em.createQuery(countCq);
			long count = (long) query.getSingleResult();
			int maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
			if (pageNum == 0) {
				pageNum = maxPage;
			}
			int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);
			typedQuery.setFirstResult(firstRec);
			typedQuery.setMaxResults(pageSize);
			List<Activity> result = typedQuery.getResultList();

			ViewPage<Activity> r = new ViewPage<>(result, count, maxPage, pageNum);
			return r;
		} finally {
			em.close();
		}
	}
}
