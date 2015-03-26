using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class StatusEntity
    {
        public StatusEntity()
        {
            this.ChangeHistories = new List<ChangeHistoryEntity>();
            this.WorkItems = new List<WorkItemEntity>();
        }
        public int StatusId { get; set; }
        public string Description { get; set; }

        public virtual List<ChangeHistoryEntity> ChangeHistories { get; set; }
        public virtual List<WorkItemEntity> WorkItems { get; set; }

    }
}