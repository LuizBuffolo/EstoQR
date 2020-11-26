using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class RequestModel : Interfaces.IPersistable
    {
        public string Id { get; set; }
        public string User { get; set; }
        public string Status { get; set; }
        public string Model { get; set; }
    }
}
