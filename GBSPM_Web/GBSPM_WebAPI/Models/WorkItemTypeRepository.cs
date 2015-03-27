using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models
{
    public class WorkItemTypeRepository : IWorkItemTypeRepository
    {
        GBSPMEntities dataContext = new GBSPMEntities();
        public IEnumerable<DataModel.WorkItemTypeEntity> GetAll()
        {
            List<WorkItemTypeEntity> workItemTypes = new List<WorkItemTypeEntity>();
            foreach (var data in dataContext.WorkItemTypes)
            {
                WorkItemTypeEntity workItemType = new WorkItemTypeEntity();
                workItemType.WorkItemTypeId = data.WorkItemTypeId;
                workItemType.Description = data.Description;

                workItemTypes.Add(workItemType);
            }

            return workItemTypes;
        }

        public DataModel.WorkItemTypeEntity GetWorkItemTypeById(int id)
        {
            var data = dataContext.WorkItemTypes.FirstOrDefault(c => c.WorkItemTypeId == id);
            if (data != null)
            {
                WorkItemTypeEntity workItemType = new WorkItemTypeEntity();
                workItemType.WorkItemTypeId = data.WorkItemTypeId;
                workItemType.Description = data.Description;
            }
            return null;
        }

        public DataModel.WorkItemTypeEntity AddWorkItemType(DataModel.WorkItemTypeEntity workItemType)
        {
            throw new NotImplementedException();
        }

        public bool UpdateWorkItemType(DataModel.WorkItemTypeEntity workItemType)
        {
            throw new NotImplementedException();
        }

        public bool DeleteWorkItemType(int id)
        {
            throw new NotImplementedException();
        }
    }
}