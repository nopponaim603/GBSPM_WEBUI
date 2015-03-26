using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class WorkItemTypeEntity
    {
        public WorkItemTypeEntity()
        {
            this.ChangeHistories = new List<ChangeHistoryEntity>();
            this.WorkItems = new List<WorkItemEntity>();
        }
    
        public int WorkItemTypeId { get; set; }
        public string Description { get; set; }
    
        public virtual List<ChangeHistoryEntity> ChangeHistories { get; set; }
        public virtual List<WorkItemEntity> WorkItems { get; set; }
    }
}