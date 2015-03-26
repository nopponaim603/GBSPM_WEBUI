using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GBSPM_WebAPI.Models;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public class ProjectRepositiory : IProjectRepositiory
    {
        GBSPMEntities dataContext = new GBSPMEntities();
        public IEnumerable<DataModel.ProjectEntity> GetAll()
        {
            List<ProjectEntity> projects = new List<ProjectEntity>();
            foreach (var item in dataContext.Projects)
            {
                ProjectEntity project = new ProjectEntity();
                project.ProjectId = item.ProjectId;
                project.Description = item.Description;
                project.Name = item.Name;

                projects.Add(project);
            }
            return projects;
        }

        public DataModel.ProjectEntity GetProjectById(int id)
        {
            var data = dataContext.Projects.FirstOrDefault(p => p.ProjectId == id);
            if (data != null)
            {
                ProjectEntity project = new ProjectEntity();
                project.ProjectId = data.ProjectId;
                project.Name = data.Name;
                project.Description = data.Description;
                return project;
            }
            return null;
        }

        public DataModel.ProjectEntity AddProject(DataModel.ProjectEntity project)
        {
            throw new NotImplementedException();
        }

        public bool UpdateProject(DataModel.ProjectEntity project)
        {
            throw new NotImplementedException();
        }

        public bool DeleteProject(int id)
        {
            throw new NotImplementedException();
        }
    }
}