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
using GBSPM_WebAPI.App_Start;
using GBSPM_WebAPI.Models;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Controllers
{
    //[AllowCrossSiteJsonAttribute]
    public class WorkItemController : ApiController
    {
        private GBSPMEntities db = new GBSPMEntities();
        private IWorkItemRepository dbContext = new WorkItemRepository();

        // GET api/WorkItem
        public IEnumerable<WorkItemEntity> GetWorkItems()
        {
            return dbContext.GetAll(); ;
        }

        // GET api/WorkItem/5
        public WorkItemEntity GetWorkItem(int id)
        {
            WorkItemEntity workitem = dbContext.GetWorkItemById(id);
            if (workitem == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return workitem;
        }

        // PUT api/WorkItem/5
        public HttpResponseMessage PutWorkItem(int id, WorkItem workitem)
        {
            if (ModelState.IsValid && id == workitem.WorkItemId)
            {
                db.Entry(workitem).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/WorkItem
        public HttpResponseMessage PostWorkItem(WorkItem workitem)
        {
            if (ModelState.IsValid)
            {
                db.WorkItems.Add(workitem);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, workitem);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = workitem.WorkItemId }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/WorkItem/5
        public HttpResponseMessage DeleteWorkItem(int id)
        {
            WorkItem workitem = db.WorkItems.Find(id);
            if (workitem == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.WorkItems.Remove(workitem);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, workitem);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}