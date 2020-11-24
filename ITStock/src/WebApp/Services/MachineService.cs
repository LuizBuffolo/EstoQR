using Core.Entities;
using Infrastructure.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Services.Interfaces;

namespace WebApp.Services
{
    public class MachineService : Interfaces.IMachineService
    {
        private IMachineRepository repository;

        public MachineService(IMachineRepository repository)
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

        public MachineModel Get(string id)
        {
            if (id == null)
            {
                return null;
            }

            return repository.GetById(id);
        }

        public List<MachineModel> GetAll()
        {
            if (repository.GetAll().Count() == 0) 
            { 
                return null;
            }

            return repository.GetAll().ToList();
        }


        public MachineModel Save(MachineModel machineModel)
        {
            if (machineModel.Equals(null))
            {
                return null;
            }
            return repository.Save(machineModel);
        }
    }
}
