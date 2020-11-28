using Core.Entities;
using System.Collections.Generic;

namespace WebApp.Services.Interfaces
{
    public interface IRequestService
    {
        RequestModel Get(string id);

        List<RequestModel> GetAll();

        RequestModel Save(RequestModel requestModel);

        bool Delete(string id);
    }
}