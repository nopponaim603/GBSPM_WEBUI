using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class WorkItemGroupEntity
    {
        public WorkItemGroupEntity()
        {
            this.WorkItems = new List<WorkItemEntity>();
        }
        public int WorkItemGroupId { get; set; }
        public string Description { get; set; }
        public int OrderNumber { get; set; }
        public int ProjectId { get; set; }

        public virtual List<WorkItemEntity> WorkItems { get; set; }
        public virtual ProjectEntity Project { get; set; }
    }
}