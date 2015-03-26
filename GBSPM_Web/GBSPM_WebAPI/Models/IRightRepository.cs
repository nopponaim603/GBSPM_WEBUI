using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public interface IRightRepository
    {
        IEnumerable<RightEntity> GetAll();
        RightEntity GetRightById(int id);
        RightEntity AddRight(RightEntity right);
        bool UpdateRight(RightEntity right);
        bool DeleteRight(int id);
    }
}
