using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Services.Interfaces
{
    public interface IMonitorService
    {
        MonitorModel Get(string id);

        List<MonitorModel> GetAll();

        MonitorModel Save(MonitorModel monitorModel);

        bool Delete(string id);
    }
}
