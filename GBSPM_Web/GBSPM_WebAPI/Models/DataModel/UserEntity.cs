using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class UserEntity
    {
        public UserEntity()
        {
            this.Projects = new List<ProjectEntity>();
            this.WorkItems = new List<WorkItemEntity>();
            this.Projects = new List<ProjectEntity>();
            this.Rights = new List<RightEntity>();
        }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int PositionId { get; set; }
        public string Email { get; set; }

        public virtual List<ChangeHistoryEntity> ChangeHistories { get; set; }
        public virtual PositionEntity Position { get; set; }
        public virtual List<WorkItemEntity> WorkItems { get; set; }
        public virtual List<ProjectEntity> Projects { get; set; }
        public virtual List<RightEntity> Rights { get; set; }
    }
}