using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class PositionEntity
    {
        public PositionEntity()
        {
            this.Users = new List<UserEntity>();
        }

        public int PositionId { get; set; }
        public string Description { get; set; }

        public virtual List<UserEntity> Users { get; set; }
    }
}