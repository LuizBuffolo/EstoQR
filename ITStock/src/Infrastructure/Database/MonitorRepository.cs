using Core.Entities;
using Infrastructure.Data;
using Infrastructure.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Database
{
    public class MonitorRepository : MongoRepository<MonitorModel>, IMonitorRepository
    {
    }
}
