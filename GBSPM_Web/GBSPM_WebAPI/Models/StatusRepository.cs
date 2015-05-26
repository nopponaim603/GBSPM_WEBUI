using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace GBSPM_WebAPI.Models
{
    public class StatusRepository : IStatusRepository
    {
        private GBSPMEntities db = new GBSPMEntities();

        public IEnumerable<DataModel.StatusEntity> GetAll()
        {
            List<StatusEntity> statuses = new List<StatusEntity>();

            foreach (var data in db.Status)
            {
                StatusEntity status = new StatusEntity();
                status.StatusId = data.StatusId;
                status.Description = data.Description;

                statuses.Add(status);
            }

            return statuses;
        }

        public DataModel.StatusEntity GetStatusById(int id)
        {
            var data = db.Status.FirstOrDefault(c => c.StatusId == id);
            if (data != null)
            {
                StatusEntity status = new StatusEntity();
                status.StatusId = data.StatusId;
                status.Description = data.Description;

                return status;
            }
            return null;
        }

        public DataModel.StatusEntity AddStatus(DataModel.StatusEntity status)
        {
            Status newStat = new Status();
            newStat.Description = status.Description;
            db.Status.Add(newStat);
            db.SaveChanges();

            return status;
        }

        public bool UpdateStatus(DataModel.StatusEntity status)
        {
            var _status = db.Status.FirstOrDefault(c => c.StatusId == status.StatusId);
            if (_status != null)
            {
                _status.Description = status.Description;
                db.SaveChanges();
                db.Entry(_status).State = EntityState.Modified;
                return true;
            }

            return false;
        }

        public bool DeleteStatus(int id)
        {
            throw new NotImplementedException();
        }
    }
}