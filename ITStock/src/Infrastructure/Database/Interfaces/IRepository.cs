using Core.Entities.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Database.Interfaces
{
    public interface IRepository<P> where P : IPersistable
    {
        IEnumerable<P> GetAll();

        IEnumerable<P> GetByAttribute(string attribute, string value);

        P GetById(string uuid);

        P Save(P element);

        IList<P> SaveAll(IList<P> elements);

        bool Delete(string uuid);
    }
}
