using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using GBSPM_WebAPI.Models;
using GBSPM_WebAPI.Models.DataModel;
using GBSPM_WebAPI.App_Start;

namespace GBSPM_WebAPI.Controllers
{
    //[AllowCrossSiteJsonAttribute]
    public class WorkItemGroupController : ApiController
    {
        private GBSPMEntities db = new GBSPMEntities();
        private IWorkItemGroupRepository dbContext = new WorkItemGroupRepository();
        // GET api/WorkItemGroup
        public IEnumerable<WorkItemGroupEntity> GetWorkItemGroups()
        {
            return dbContext.GetAll();
        }

        // GET api/WorkItemGroup/5
        public WorkItemGroupEntity GetWorkItemGroup(int id)
        {
            WorkItemGroupEntity workitemgroup = dbContext.GetWorkItemGroupById(id);
            if (workitemgroup == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return workitemgroup;
        }

        // PUT api/WorkItemGroup/5
        public HttpResponseMessage PutWorkItemGroup(WorkItemGroupEntity workitemgroup)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (workitemgroup == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                dbContext.UpdateWorkItemGroup(workitemgroup);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/WorkItemGroup
        public HttpResponseMessage PostWorkItemGroup(WorkItemGroupEntity workitemgroup)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (workitemgroup == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                dbContext.AddWorkItemGroup(workitemgroup);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // DELETE api/WorkItemGroup/5
        public HttpResponseMessage DeleteWorkItemGroup(int id)
        {
            WorkItemGroup workitemgroup = db.WorkItemGroups.Find(id);
            if (workitemgroup == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.WorkItemGroups.Remove(workitemgroup);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, workitemgroup);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}