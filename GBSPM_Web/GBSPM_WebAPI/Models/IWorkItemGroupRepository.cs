using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public interface IWorkItemGroupRepository
    {
        IEnumerable<WorkItemGroupEntity> GetAll();
        WorkItemGroupEntity GetWorkItemGroupById(int id);
        WorkItemGroupEntity AddWorkItemGroup(WorkItemGroupEntity workItemGroup);
        bool UpdateWorkItemGroup(WorkItemGroupEntity workItemGroup);
        bool DeleteWorkItemGroup(int id);
    }
}
