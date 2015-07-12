using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Data;
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
            foreach (var data in db.WorkItemGroups.OrderBy(c => c.ProjectId).ThenBy(c => c.OrderNumber))
            {
                WorkItemGroupEntity workItemGroup = new WorkItemGroupEntity();
                workItemGroup.WorkItemGroupId = data.WorkItemGroupId;
                workItemGroup.Description = data.Description;
                workItemGroup.OrderNumber = data.OrderNumber;
                workItemGroup.ProjectId = data.ProjectId;
                workItemGroup.Project = new ProjectRepositiory().GetProjectById(data.ProjectId);

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
                workItemGroup.OrderNumber = data.OrderNumber;
                workItemGroup.ProjectId = data.ProjectId;
                workItemGroup.Project = new ProjectRepositiory().GetProjectById(data.ProjectId);
                return workItemGroup;
            }
            return null;
        }

        public DataModel.WorkItemGroupEntity AddWorkItemGroup(DataModel.WorkItemGroupEntity workItemGroup)
        {
            WorkItemGroup l_group = new WorkItemGroup();
            l_group.Description = workItemGroup.Description;
            l_group.OrderNumber = workItemGroup.OrderNumber;
            l_group.ProjectId = workItemGroup.ProjectId;
            db.WorkItemGroups.Add(l_group);
            db.SaveChanges();
            return workItemGroup;
        }

        public bool UpdateWorkItemGroup(DataModel.WorkItemGroupEntity workItemGroup)
        {
            var l_group = db.WorkItemGroups.FirstOrDefault(c => c.WorkItemGroupId == workItemGroup.WorkItemGroupId);
            if (l_group != null)
            {
                l_group.Description = workItemGroup.Description;
                l_group.OrderNumber = workItemGroup.OrderNumber;
                l_group.ProjectId = workItemGroup.ProjectId;
                db.Entry(l_group).State = EntityState.Modified;
                db.SaveChanges();
            }
            return false;
        }

        public bool DeleteWorkItemGroup(int id)
        {
            throw new NotImplementedException();
        }
    }
}