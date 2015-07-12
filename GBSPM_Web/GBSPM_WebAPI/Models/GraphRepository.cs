using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public class GraphRepository : IGraphRepository
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
                workItemGroup.OrderNumber = data.OrderNumber;
                workItemGroup.ProjectId = data.ProjectId;
                workItemGroup.WorkItems = new WorkItemRepository().GetWorkItemsByWorkItemGroupId(data.WorkItemGroupId);
                workItemsGroups.Add(workItemGroup);
            }

            return workItemsGroups;
        }


        public IEnumerable<WorkItemGroupEntity> GetWorkItemGroupsByProjectId(int projectId)
        {
            List<WorkItemGroupEntity> workItemsGroups = new List<WorkItemGroupEntity>();
            var WorkItemGroups = db.WorkItemGroups.Where(c => c.ProjectId == projectId);
            if (WorkItemGroups != null)
            {
                foreach (var data in WorkItemGroups.OrderBy(q => q.OrderNumber))
                {
                    WorkItemGroupEntity workItemGroup = new WorkItemGroupEntity();
                    workItemGroup.WorkItemGroupId = data.WorkItemGroupId;
                    workItemGroup.Description = data.Description;
                    workItemGroup.OrderNumber = data.OrderNumber;
                    workItemGroup.ProjectId = data.ProjectId;
                    workItemGroup.WorkItems = new WorkItemRepository().GetWorkItemsByWorkItemGroupId(data.WorkItemGroupId);
                    workItemsGroups.Add(workItemGroup);
                }
            }

            return workItemsGroups;
        }
    }
}