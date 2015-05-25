using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

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
                user.Position = new PositionEntity() { Description = item.Position.Description, PositionId = item.PositionId };

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
                    Email = user.Email,
                    Position = new PositionEntity() 
                    {
                        Description = user.Position.Description,
                        PositionId = user.PositionId                        
                    }
                };
            }
            return null;
        }

        public UserEntity AddUser(DataModel.UserEntity user)
        {
            var userToUpdate = new User();
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;
            userToUpdate.PositionId = user.PositionId;
            userToUpdate.UserName = user.UserName;
            userToUpdate.Password = user.Password;
            dataContext.Users.Add(userToUpdate);
            dataContext.SaveChanges();        

            return user;
        }

        public bool UpdateUser(DataModel.UserEntity user)
        {
            var userToUpdate = dataContext.Users.FirstOrDefault(c => c.UserId == user.UserId);
            if (userToUpdate != null)
            {
                userToUpdate.FirstName = user.FirstName;
                userToUpdate.LastName = user.LastName;
                userToUpdate.Email = user.Email;
                userToUpdate.PositionId = user.PositionId;
                dataContext.SaveChanges();
                dataContext.Entry(userToUpdate).State = EntityState.Modified;
                return true;
            }

            return false;
        }

        public bool DeleteUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}