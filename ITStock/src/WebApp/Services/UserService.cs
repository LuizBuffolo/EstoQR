using Core.Entities;
using Infrastructure.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Services.Interfaces;

namespace WebApp.Services
{
    public class UserService : Interfaces.IUserService
    {
        private IUserRepository repository;

        public UserService(IUserRepository repository)
        {
            this.repository = repository;
        }

        public bool Delete(string id)
        {
            if (id == null)
            {
                return false;
            }

            return repository.Delete(id);
        }

        public UserModel Get(string id)
        {
            if (id == null)
            {
                return null;
            }

            return repository.GetById(id);
        }

        public List<UserModel> GetAll()
        {
            if (repository.GetAll().Count() == 0)
            {
                return null;
            }

            return repository.GetAll().ToList();
        }


        public UserModel Save(UserModel userModel)
        {
            if (userModel.Equals(null))
            {
                return null;
            }
            return repository.Save(userModel);
        }
    }
}
