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
    [AllowCrossSiteJsonAttribute]
    public class WorkItemTypeController : ApiController
    {
        private GBSPMEntities db = new GBSPMEntities();
        private IWorkItemTypeRepository dbContext = new WorkItemTypeRepository();

        // GET api/WorkItemType
        public IEnumerable<WorkItemTypeEntity> GetWorkItemTypes()
        {
            return dbContext.GetAll();
        }

        // GET api/WorkItemType/5
        public WorkItemTypeEntity GetWorkItemType(int id)
        {
            WorkItemTypeEntity workitemtype = dbContext.GetWorkItemTypeById(id);
            if (workitemtype == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return workitemtype;
        }

        // PUT api/WorkItemType/5
        public HttpResponseMessage PutWorkItemType(int id, WorkItemType workitemtype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != workitemtype.WorkItemTypeId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(workitemtype).State = EntityState.Modified;

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

        // POST api/WorkItemType
        public HttpResponseMessage PostWorkItemType(WorkItemType workitemtype)
        {
            if (ModelState.IsValid)
            {
                db.WorkItemTypes.Add(workitemtype);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, workitemtype);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = workitemtype.WorkItemTypeId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/WorkItemType/5
        public HttpResponseMessage DeleteWorkItemType(int id)
        {
            WorkItemType workitemtype = db.WorkItemTypes.Find(id);
            if (workitemtype == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.WorkItemTypes.Remove(workitemtype);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, workitemtype);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}