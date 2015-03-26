using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class ChangeHistoryEntity
    {
        public int ChangeId { get; set; }
        public int WorkItemId { get; set; }
        public int WorkItemTypeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public Nullable<int> AssignTo { get; set; }
        public int StatusId { get; set; }
        public int ProjectId { get; set; }
        public Nullable<decimal> EstimateTime { get; set; }
        public Nullable<decimal> ActualTime { get; set; }
        public DateTime ChangeTime { get; set; }

        public virtual ProjectEntity Project { get; set; }
        public virtual StatusEntity Status { get; set; }
        public virtual UserEntity User { get; set; }
        public virtual WorkItemEntity WorkItem { get; set; }
        public virtual WorkItemTypeEntity WorkItemType { get; set; }
    }
}