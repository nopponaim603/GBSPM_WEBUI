using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GBSPM_WebAPI.Models.DataModel;

namespace GBSPM_WebAPI.Models
{
    public interface IProjectRepositiory
    {
        IEnumerable<ProjectEntity> GetAll();
        ProjectEntity GetProjectById(int id);
        ProjectEntity AddProject(ProjectEntity project);
        bool UpdateProject(ProjectEntity project);
        bool DeleteProject(int id);
    }
}
