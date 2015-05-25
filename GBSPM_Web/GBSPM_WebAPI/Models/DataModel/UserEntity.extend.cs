using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public partial class UserEntity
    {
        public bool IsAdmin
        {
            get
            {
                return this.Position.Description == "Administrator";
            }
        }
    }
}