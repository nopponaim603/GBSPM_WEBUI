using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GBSPM_WebAPI.Models
{
    public class UserRepository : IUserRepository
    {
        GBSPMEntities dataContext = new GBSPMEntities();
        public IEnumerable<DataModel.UserEntity> GetAll()
        {
            List<UserEntity> users = new List<UserEntity>();
            foreach (var item in dataContext.Users)
            {
                UserEntity user = new UserEntity();
                user.UserId = item.UserId;
                user.FirstName = item.FirstName;
                user.LastName = item.LastName;
                user.UserName = item.UserName;
                user.Password = item.Password;
                user.PositionId = item.PositionId;
                user.Email = item.Email;
                foreach (var project in item.Projects)
                {
                    user.Projects.Add(new ProjectEntity() { ProjectId = project.ProjectId, Description = project.Description });
                }
                users.Add(user);
            }
            return users;
        }

        public DataModel.UserEntity GetUserById(int id)
        {
            var user = dataContext.Users.FirstOrDefault(c => c.UserId == id);
            if (user != null)
            {
                return new UserEntity()
                {
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    Password = user.Password,
                    PositionId = user.PositionId,
                    Email = user.Email
                };
            }
            return null;
        }

        public DataModel.UserEntity AddUser(DataModel.UserEntity user)
        {
            throw new NotImplementedException();
        }

        public bool UpdateUser(DataModel.UserEntity user)
        {
            throw new NotImplementedException();
        }

        public bool DeleteUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}