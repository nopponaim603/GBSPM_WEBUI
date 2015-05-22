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
    public class StatusController : ApiController
    {
        private GBSPMEntities db = new GBSPMEntities();
        private IStatusRepository dbContext = new StatusRepository();

        // GET api/Status
        public IEnumerable<StatusEntity> GetStatus()
        {
            return dbContext.GetAll() ;
        }

        // GET api/Status/5
        public StatusEntity GetStatus(int id)
        {
            StatusEntity status = dbContext.GetStatusById(id);
            if (status == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return status;
        }

        // PUT api/Status/5
        public HttpResponseMessage PutStatus(StatusEntity status)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (status == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                dbContext.UpdateStatus(status);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Status
        public HttpResponseMessage PostStatus(Status status)
        {
            if (ModelState.IsValid)
            {
                db.Status.Add(status);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, status);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = status.StatusId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Status/5
        public HttpResponseMessage DeleteStatus(int id)
        {
            Status status = db.Status.Find(id);
            if (status == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Status.Remove(status);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, status);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}