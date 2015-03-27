using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
            throw new NotImplementedException();
        }

        public bool UpdateStatus(DataModel.StatusEntity status)
        {
            throw new NotImplementedException();
        }

        public bool DeleteStatus(int id)
        {
            throw new NotImplementedException();
        }
    }
}