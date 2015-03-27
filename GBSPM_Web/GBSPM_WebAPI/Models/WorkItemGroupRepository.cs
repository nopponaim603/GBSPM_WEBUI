using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models
{
    public class WorkItemGroupRepository : IWorkItemGroupRepository
    {
        private GBSPMEntities db = new GBSPMEntities();

        public IEnumerable<DataModel.WorkItemGroupEntity> GetAll()
        {
            List<WorkItemGroupEntity> workItemsGroups = new List<WorkItemGroupEntity>();
            foreach (var data in db.WorkItemGroups)
            {
                WorkItemGroupEntity workItemGroup = new WorkItemGroupEntity();
                workItemGroup.WorkItemGroupId = data.WorkItemGroupId;
                workItemGroup.Description = data.Description;

                workItemsGroups.Add(workItemGroup);
            }

            return workItemsGroups;
        }

        public DataModel.WorkItemGroupEntity GetWorkItemGroupById(int id)
        {
            var data = db.WorkItemGroups.FirstOrDefault(c => c.WorkItemGroupId == id);
            if (data != null)
            {
                WorkItemGroupEntity workItemGroup = new WorkItemGroupEntity();
                workItemGroup.WorkItemGroupId = data.WorkItemGroupId;
                workItemGroup.Description = data.Description;
                return workItemGroup;
            }
            return null;
        }

        public DataModel.WorkItemGroupEntity AddWorkItemGroup(DataModel.WorkItemGroupEntity workItemGroup)
        {
            throw new NotImplementedException();
        }

        public bool UpdateWorkItemGroup(DataModel.WorkItemGroupEntity workItemGroup)
        {
            throw new NotImplementedException();
        }

        public bool DeleteWorkItemGroup(int id)
        {
            throw new NotImplementedException();
        }
    }
}