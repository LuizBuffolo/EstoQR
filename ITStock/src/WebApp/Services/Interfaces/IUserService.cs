using Core.Entities;
using System.Collections.Generic;

namespace WebApp.Services.Interfaces
{
    public interface IUserService
    {
        UserModel Get(string id);

        List<UserModel> GetAll();

        UserModel Save(UserModel userModel);

        bool Delete(string id);
    }
}