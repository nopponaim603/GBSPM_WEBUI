using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace GBSPM_WebAPI.Models
{
    public class RightRepository : IRightRepository
    {
        private GBSPMEntities db = new GBSPMEntities();

        public IEnumerable<DataModel.RightEntity> GetAll()
        {
            List<RightEntity> rights = new List<RightEntity>();

            foreach (var data in db.Rights)
            {
                RightEntity right = new RightEntity();
                right.RightId = data.RightId;
                right.Description = data.Description;

                rights.Add(right);
            }

            return rights;
        }

        public DataModel.RightEntity GetRightById(int id)
        {
            var data = db.Rights.FirstOrDefault(c => c.RightId == id);
            if (data != null)
            {
                RightEntity right = new RightEntity();
                right.RightId = data.RightId;
                right.Description = data.Description;
                return right;
            }

            return null;
        }

        public DataModel.RightEntity AddRight(DataModel.RightEntity right)
        {
            Right newRight = new Right();
            newRight.Description = right.Description;
            db.Rights.Add(newRight);
            db.SaveChanges();

            return right;
        }

        public bool UpdateRight(DataModel.RightEntity right)
        {
            var _right = db.Rights.FirstOrDefault(c => c.RightId == right.RightId);
            if (_right != null)
            {
                _right.Description = right.Description;
                db.SaveChanges();
                db.Entry(_right).State = EntityState.Modified;
                return true;
            }
            return false;
        }

        public bool DeleteRight(int id)
        {
            throw new NotImplementedException();
        }
    }
}