using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class RightEntity
    {
        public RightEntity()
        {
            this.Users = new List<UserEntity>();
        }

        public int RightId { get; set; }
        public string Description { get; set; }

        public virtual List<UserEntity> Users { get; set; }
    }
}