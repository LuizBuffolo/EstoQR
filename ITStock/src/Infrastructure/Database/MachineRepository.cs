﻿using Core.Entities;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Database.Interfaces
{
    public class MachineRepository : MongoRepository<MachineModel> , IMachineRepository 
    {
     
    }
}
