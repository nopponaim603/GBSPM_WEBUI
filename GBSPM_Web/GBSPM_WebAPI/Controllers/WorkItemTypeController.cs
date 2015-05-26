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
        public HttpResponseMessage PutWorkItemType(WorkItemTypeEntity workitemtype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (workitemtype == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                dbContext.UpdateWorkItemType(workitemtype);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/WorkItemType
        public HttpResponseMessage PostWorkItemType(WorkItemTypeEntity workitemtype)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (workitemtype == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                dbContext.AddWorkItemType(workitemtype);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
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