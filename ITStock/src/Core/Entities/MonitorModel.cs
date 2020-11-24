using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class MonitorModel : Interfaces.IPersistable
    {
        public string Id { get; set; }
        public string Manufacturer { get; set; }
        public string Size { get; set; }
        public string CFit { get; set; }
        public string Sector { get; set; }
        public string User { get; set; }
        public bool Avaiable { get; set; }
    }
}
