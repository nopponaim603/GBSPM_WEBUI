using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public interface IWorkItemTypeRepository
    {
        IEnumerable<WorkItemTypeEntity> GetAll();
        WorkItemTypeEntity GetWorkItemTypeById(int id);
        WorkItemTypeEntity AddWorkItemType(WorkItemTypeEntity workItemType);
        bool UpdateWorkItemType(WorkItemTypeEntity workItemType);
        bool DeleteWorkItemType(int id);
    }
}
