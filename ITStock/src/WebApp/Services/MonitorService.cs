using Core.Entities;
using System;
using Infrastructure.Database;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Database.Interfaces;

namespace WebApp.Services
{
    public class MonitorService : Interfaces.IMonitorService
    {
        private IMonitorRepository repository;
         
        public MonitorService(IMonitorRepository repository)
        {
            this.repository = repository;
        }

        public bool Delete(string id)
        {
            if (id.Equals(null))
            {
                return false;
            }

            return repository.Delete(id);
        }

        public List<MonitorModel> GetAll()
        {
            if (repository.GetAll().Count() == 0)
            {
                return null;
            }

            return repository.GetAll().ToList();
        }

        public MonitorModel Get(string id)
        {
            if (id.Equals(null))
            {
                return null;
            }

            return repository.GetById(id);
        }

        public MonitorModel Save(MonitorModel monitorModel)
        {
            if (monitorModel.Equals(null))
            {
                return null;
            }

            return repository.Save(monitorModel);
        }
    }
}
