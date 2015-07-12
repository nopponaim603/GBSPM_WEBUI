using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models.DataModel
{
    public class GraphEntity
    {
        public virtual List<WorkItemGroupEntity> WorkItemGroups { get; set; }
    }
}