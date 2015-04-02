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
    public class ProjectController : ApiController
    {
        private GBSPMEntities db = new GBSPMEntities();
        private IProjectRepositiory dbContext = new ProjectRepositiory();
        // GET api/Project
        public IEnumerable<ProjectEntity> GetProjects()
        {
            return dbContext.GetAll(); ;
        }

        // GET api/Project/5
        public ProjectEntity GetProject(int id)
        {
            ProjectEntity project = dbContext.GetProjectById(id);
            if (project == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return project;
        }

        // PUT api/Project/5
        public HttpResponseMessage PutProject(int id, Project project)
        {
            if (ModelState.IsValid && id == project.ProjectId)
            {
                db.Entry(project).State = EntityState.Modified;

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

        // POST api/Project
        public HttpResponseMessage PostProject(Project project)
        {
            if (ModelState.IsValid)
            {
                db.Projects.Add(project);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, project);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = project.ProjectId }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Project/5
        public HttpResponseMessage DeleteProject(int id)
        {
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Projects.Remove(project);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, project);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}