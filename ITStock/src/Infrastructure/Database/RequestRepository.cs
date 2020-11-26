using Core.Entities;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Database.Interfaces
{
    public class RequestRepository : MongoRepository<RequestModel>, IRequestRepository
    {
    }
}
