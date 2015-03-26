using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public interface IStatusRepository
    {
        IEnumerable<StatusEntity> GetAll();
        StatusEntity GetStatusById(int id);
        StatusEntity AddStatus(StatusEntity status);
        bool UpdateStatus(StatusEntity status);
        bool DeleteStatus(int id);
    }
}
