using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    interface IGraphRepository
    {
        IEnumerable<WorkItemGroupEntity> GetAll();

        IEnumerable<WorkItemGroupEntity> GetWorkItemGroupsByProjectId(int projectId);
    }
}
