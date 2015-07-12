using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GBSPM_WebAPI.Models;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Controllers
{
    public class GraphController : ApiController
    {
        private IGraphRepository dataContext = new GraphRepository();
        // GET api/graph
        public IEnumerable<WorkItemGroupEntity> Get()
        {
            return dataContext.GetAll();
        }

        // GET api/graph/5
        public IEnumerable<WorkItemGroupEntity> Get(int id)
        {
            return dataContext.GetWorkItemGroupsByProjectId(id);
        }

        // POST api/graph
        public void Post([FromBody]string value)
        {
        }

        // PUT api/graph/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/graph/5
        public void Delete(int id)
        {
        }
    }
}
