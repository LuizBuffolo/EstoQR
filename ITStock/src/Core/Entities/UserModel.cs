using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class UserModel : Interfaces.IPersistable
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Hierarchy { get; set; }
        public bool LoggedIn { get; set; }
    }
}
