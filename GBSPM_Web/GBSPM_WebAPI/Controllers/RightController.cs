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
    public class RightController : ApiController
    {
        private GBSPMEntities db = new GBSPMEntities();
        private IRightRepository dbContext = new RightRepository();

        // GET api/Right
        public IEnumerable<RightEntity> GetRights()
        {
            return dbContext.GetAll();
        }

        // GET api/Right/5
        public RightEntity GetRight(int id)
        {
            RightEntity right = dbContext.GetRightById(id);
            if (right == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return right;
        }

        // PUT api/Right/5
        public HttpResponseMessage PutRight(int id, Right right)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != right.RightId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(right).State = EntityState.Modified;

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

        // POST api/Right
        public HttpResponseMessage PostRight(Right right)
        {
            if (ModelState.IsValid)
            {
                db.Rights.Add(right);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, right);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = right.RightId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Right/5
        public HttpResponseMessage DeleteRight(int id)
        {
            Right right = db.Rights.Find(id);
            if (right == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Rights.Remove(right);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, right);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}