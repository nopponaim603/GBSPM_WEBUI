using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public class PositionRepository : IPositionRepository
    {
        GBSPMEntities dataContext = new GBSPMEntities();
        public IEnumerable<DataModel.PositionEntity> GetAll()
        {
            List<PositionEntity> positions = new List<PositionEntity>();
            foreach (var item in dataContext.Positions)
            {
                PositionEntity position = new PositionEntity();
                position.PositionId = item.PositionId;
                position.Description = item.Description;
                positions.Add(position);
            }

            return positions;
        }

        public DataModel.PositionEntity GetPositionById(int id)
        {
            var position = dataContext.Positions.FirstOrDefault(p => p.PositionId == id);
            if (position != null)
            {
                PositionEntity result = new PositionEntity();
                result.PositionId = position.PositionId;
                result.Description = position.Description;
                return result;
            }
            return null;
        }

        public DataModel.PositionEntity SavePosition(DataModel.PositionEntity position)
        {
            Position newPosition = new Position();
            newPosition.Description = position.Description;
            dataContext.Positions.Add(newPosition);
            dataContext.SaveChanges();

            return position;
        }

        public bool UpdatePosition(DataModel.PositionEntity position)
        {
            var _position = dataContext.Positions.FirstOrDefault(c => c.PositionId == position.PositionId);
            if (_position != null)
            {
                _position.Description = position.Description;
                dataContext.SaveChanges();
                dataContext.Entry(_position).State = EntityState.Modified;
                return true;
            }
            return false;
        }

        public bool DeletePosition(int id)
        {
            throw new NotImplementedException();
        }
    }
}