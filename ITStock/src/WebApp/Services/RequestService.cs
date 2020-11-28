using Core.Entities;
using Infrastructure.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Services
{
    public class RequestService : Interfaces.IRequestService
    {
        private IRequestRepository repository;

        public RequestService(IRequestRepository repository)
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

        public RequestModel Get(string id)
        {
            if (id == null)
            {
                return null;
            }

            return repository.GetById(id);
        }

        public List<RequestModel> GetAll()
        {
            if (repository.GetAll().Count() == 0)
            {
                return null;
            }

            return repository.GetAll().ToList();
        }


        public RequestModel Save(RequestModel requestModel)
        {
            if (requestModel.Equals(null))
            {
                return null;
            }
            return repository.Save(requestModel);
        }
    }
}
