using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GBSPM_WebAPI.Models;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public class WorkItemRepository : IWorkItemRepository
    {
        GBSPMEntities dataContext = new GBSPMEntities();
        
        public IEnumerable<WorkItemEntity> GetAll()
        {
            List<WorkItemEntity> workItems = new List<WorkItemEntity>();
            foreach (var item in dataContext.WorkItems)
            {
                WorkItemEntity workItem = new WorkItemEntity();
                workItem.WorkItemId = item.WorkItemId;
                workItem.WorkItemTypeId = item.WorkItemTypeId;
                workItem.Title = item.Title;
                workItem.Description = item.Description;
                workItem.Priority = item.Priority;
                workItem.AssignTo = item.AssignTo;
                workItem.StatusId = item.StatusId;
                workItem.ProjectId = item.ProjectId;
                workItem.EstimateTime = item.EstimateTime;
                workItem.ActualTime = item.ActualTime;
                workItem.WorkItemGroupId = item.WorkItemGroupId;

                workItem.Project = new ProjectRepositiory().GetProjectById(item.ProjectId);
                workItems.Add(workItem);
            }

            return workItems;
        }

        public WorkItemEntity GetWorkItemById(int id)
        {
            var data = dataContext.WorkItems.FirstOrDefault(w => w.WorkItemId == id);
            if (data != null)
            {
                WorkItemEntity workItem = new WorkItemEntity();
                workItem.WorkItemId = data.WorkItemId;
                workItem.WorkItemTypeId = data.WorkItemTypeId;
                workItem.Title = data.Title;
                workItem.Description = data.Description;
                workItem.Priority = data.Priority;
                workItem.AssignTo = data.AssignTo;
                workItem.StatusId = data.StatusId;
                workItem.ProjectId = data.ProjectId;
                workItem.EstimateTime = data.EstimateTime;
                workItem.ActualTime = data.ActualTime;
                workItem.WorkItemGroupId = data.WorkItemGroupId;

                workItem.Project = new ProjectRepositiory().GetProjectById(data.ProjectId);

                return workItem;
            }
            return null;
        }

        public WorkItemEntity AddWorkItem(WorkItemEntity workItem)
        {
            throw new NotImplementedException();
        }

        public bool UpdateWorkItem(WorkItemEntity workItem)
        {
            throw new NotImplementedException();
        }

        public bool DeleteWorkItem(int id)
        {
            throw new NotImplementedException();
        }
    }
}