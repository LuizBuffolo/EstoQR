﻿using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Database.Interfaces
{
    public interface IUserRepository : IRepository<UserModel>
    {
    }
}
