using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class ProjectEntity
    {
        public ProjectEntity()
        {
            this.ChangeHistories = new List<ChangeHistoryEntity>();
            this.WorkItems = new List<WorkItemEntity>();
            this.Users = new List<UserEntity>();
        }

        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual List<ChangeHistoryEntity> ChangeHistories { get; set; }
        public virtual List<WorkItemEntity> WorkItems { get; set; }
        public virtual List<UserEntity> Users { get; set; }
    }
}