//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GBSPM_WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class WorkItem
    {
        public WorkItem()
        {
            this.ChangeHistories = new HashSet<ChangeHistory>();
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
    
        public virtual ICollection<ChangeHistory> ChangeHistories { get; set; }
        public virtual Project Project { get; set; }
        public virtual Status Status { get; set; }
        public virtual User User { get; set; }
        public virtual WorkItemGroup WorkItemGroup { get; set; }
        public virtual WorkItemType WorkItemType { get; set; }
    }
}
