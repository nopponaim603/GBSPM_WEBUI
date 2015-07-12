using System;
using System.Collections.Generic;
using System.Data;
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
            foreach (var item in dataContext.WorkItems.OrderBy(c => c.Priority))
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
                workItem.User = workItem.AssignTo.HasValue ? new UserRepository().GetUserById(workItem.AssignTo.Value) : null;
                workItem.WorkItemType = new WorkItemTypeRepository().GetWorkItemTypeById(workItem.WorkItemTypeId);
                workItem.WorkItemGroup = new WorkItemGroupRepository().GetWorkItemGroupById(workItem.WorkItemGroupId);
                workItem.Status = new StatusRepository().GetStatusById(workItem.StatusId);
                workItem.Project = new ProjectRepositiory().GetProjectById(workItem.ProjectId);
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
                workItem.User = workItem.AssignTo.HasValue ? new UserRepository().GetUserById(data.AssignTo.Value) : null;
                workItem.WorkItemType = new WorkItemTypeRepository().GetWorkItemTypeById(data.WorkItemTypeId);
                workItem.WorkItemGroup = new WorkItemGroupRepository().GetWorkItemGroupById(data.WorkItemGroupId);
                workItem.Status = new StatusRepository().GetStatusById(data.StatusId);
                workItem.Project = new ProjectRepositiory().GetProjectById(data.ProjectId);

                return workItem;
            }
            return null;
        }

        public WorkItemEntity AddWorkItem(WorkItemEntity workItem)
        {
            WorkItem l_workItem = new WorkItem();
            l_workItem.Title = workItem.Title;
            l_workItem.StatusId = workItem.StatusId;
            l_workItem.ProjectId = workItem.ProjectId;
            l_workItem.WorkItemTypeId = workItem.WorkItemTypeId;
            l_workItem.AssignTo = workItem.AssignTo;
            l_workItem.Description = workItem.Description;
            l_workItem.EstimateTime = workItem.EstimateTime;
            l_workItem.ActualTime = workItem.ActualTime;
            l_workItem.Priority = workItem.Priority;
            l_workItem.WorkItemGroupId = workItem.WorkItemGroupId;
            dataContext.WorkItems.Add(l_workItem);
            dataContext.SaveChanges();

            return workItem;
        }

        public bool UpdateWorkItem(WorkItemEntity workItem)
        {
            var l_workItem = dataContext.WorkItems.FirstOrDefault(c => c.WorkItemId == workItem.WorkItemId);
            if(l_workItem != null)
            {
                l_workItem.Title = workItem.Title;
                l_workItem.StatusId = workItem.StatusId;
                l_workItem.ProjectId = workItem.ProjectId;
                l_workItem.WorkItemTypeId = workItem.WorkItemTypeId;
                l_workItem.AssignTo = workItem.AssignTo;
                l_workItem.Description = workItem.Description;
                l_workItem.EstimateTime = workItem.EstimateTime;
                l_workItem.ActualTime = workItem.ActualTime;
                l_workItem.Priority = workItem.Priority;
                l_workItem.WorkItemGroupId = workItem.WorkItemGroupId;
                dataContext.Entry(l_workItem).State = EntityState.Modified;
                dataContext.SaveChanges();
                return true;
            }
            return false;
        }

        public bool DeleteWorkItem(int id)
        {
            throw new NotImplementedException();
        }

        public List<WorkItemEntity> GetWorkItemsByWorkItemGroupId(int workItemGroupId)
        {
            List<WorkItemEntity> workItems = new List<WorkItemEntity>();

            var items = dataContext.WorkItems.Where(c => c.WorkItemGroupId == workItemGroupId);
            if (items != null)
            {
                foreach (var item in items.OrderBy( c=> c.Priority))
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
                    workItem.User = workItem.AssignTo.HasValue ? new UserRepository().GetUserById(workItem.AssignTo.Value) : null;
                    workItem.WorkItemType = new WorkItemTypeRepository().GetWorkItemTypeById(workItem.WorkItemTypeId);
                    workItem.WorkItemGroup = new WorkItemGroupRepository().GetWorkItemGroupById(workItem.WorkItemGroupId);
                    workItem.Status = new StatusRepository().GetStatusById(workItem.StatusId);
                    workItem.Project = new ProjectRepositiory().GetProjectById(workItem.ProjectId);
                    workItems.Add(workItem);
                }
            }

            return workItems;
        }
    }
}