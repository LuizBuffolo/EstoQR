using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class MachineModel : Interfaces.IPersistable
    {
        public string Id { get; set; }
        public string Model { get; set; }
        public string Manufacturer { get; set; }
        public string Processor { get; set; }
        public string Ram { get; set; }
        public string User { get; set; }
        public bool Available { get; set; }

    }
}
