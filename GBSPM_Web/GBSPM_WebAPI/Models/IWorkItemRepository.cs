using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public interface IWorkItemRepository
    {
        IEnumerable<WorkItemEntity> GetAll();
        WorkItemEntity GetWorkItemById(int id);
        WorkItemEntity AddWorkItem(WorkItemEntity workItem);
        bool UpdateWorkItem(WorkItemEntity workItem);
        bool DeleteWorkItem(int id);
    }
}
