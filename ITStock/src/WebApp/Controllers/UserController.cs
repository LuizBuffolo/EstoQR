using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services.Interfaces;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            if (id.Equals(null))
            {
                return BadRequest();
            }

            var user = userService.Get(id);

            if (user.Equals(null))
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = userService.GetAll();

            if (users != null)
            {
                users.Sort((x, y) => x.Username.CompareTo(y.Username));
                return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(users));
            }
            else
            {
                UserModel user = new UserModel();
                user.Username = "adm";
                user.Password = "adm";
                user.Hierarchy = "Administrador";
                var user1 = userService.Save(user);
                users = userService.GetAll();

                if(users != null)
                {
                    users.Sort((x, y) => x.Username.CompareTo(y.Username));
                    return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(users));
                }
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult Save([FromBody] UserModel element)
        {
            if (element.Equals(null))
            {
                return BadRequest();
            }

            var user = userService.Save(element);

            if (user.Equals(null))
            {
                return NotFound();
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(user));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            bool user = userService.Delete(id);

            if (user == false)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}