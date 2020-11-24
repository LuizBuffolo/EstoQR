using Core.Entities;
using System.Collections.Generic;

namespace WebApp.Services.Interfaces
{
    public interface IMachineService 
    {
        MachineModel Get(string id);

        List<MachineModel> GetAll();

        MachineModel Save(MachineModel machineModel);

        bool Delete(string id);
    }
}