using GBSPM_WebAPI.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GBSPM_WebAPI.Models
{
    interface IUserRepository
    {
        IEnumerable<UserEntity> GetAll();
        UserEntity GetUserById(int id);
        UserEntity AddUser(UserEntity user);
        bool UpdateUser(UserEntity user);
        bool DeleteUser(int id);
        UserEntity GetLonginUser(string username, string password);
    }
}
