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
    public class PositionController : ApiController
    {
        private GBSPMEntities db = new GBSPMEntities();

        private IPositionRepository dbContext = new PositionRepository();

        // GET api/Position
        public IEnumerable<PositionEntity> GetPositions()
        {
            return dbContext.GetAll();
        }

        // GET api/Position/5
        public PositionEntity GetPosition(int id)
        {
            PositionEntity position = dbContext.GetPositionById(id);
            if (position == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return position;
        }

        // PUT api/Position/5
        public HttpResponseMessage PutPosition(int id, Position position)
        {
            if (ModelState.IsValid && id == position.PositionId)
            {
                db.Entry(position).State = EntityState.Modified;

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

        // POST api/Position
        public HttpResponseMessage PostPosition(Position position)
        {
            if (ModelState.IsValid)
            {
                db.Positions.Add(position);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, position);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = position.PositionId }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Position/5
        public HttpResponseMessage DeletePosition(int id)
        {
            Position position = db.Positions.Find(id);
            if (position == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Positions.Remove(position);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, position);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}