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
        public HttpResponseMessage PutWorkItemGroup(int id, WorkItemGroup workitemgroup)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != workitemgroup.WorkItemGroupId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(workitemgroup).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/WorkItemGroup
        public HttpResponseMessage PostWorkItemGroup(WorkItemGroup workitemgroup)
        {
            if (ModelState.IsValid)
            {
                db.WorkItemGroups.Add(workitemgroup);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, workitemgroup);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = workitemgroup.WorkItemGroupId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
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