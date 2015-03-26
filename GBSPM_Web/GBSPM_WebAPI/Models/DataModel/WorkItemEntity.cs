using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class WorkItemEntity
    {
        public WorkItemEntity()
        {
            this.ChangeHistories = new List<ChangeHistoryEntity>();
        }

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
        public int WorkItemGroupId { get; set; }

        public virtual List<ChangeHistoryEntity> ChangeHistories { get; set; }
        public virtual ProjectEntity Project { get; set; }
        public virtual StatusEntity Status { get; set; }
        public virtual UserEntity User { get; set; }
        public virtual WorkItemGroupEntity WorkItemGroup { get; set; }
        public virtual WorkItemTypeEntity WorkItemType { get; set; }
    }
}