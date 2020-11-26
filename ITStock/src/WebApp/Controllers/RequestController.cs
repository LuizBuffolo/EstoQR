using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services.Interfaces;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private IRequestService requestService;
        public RequestController(IRequestService requestService)
        {
            this.requestService = requestService;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            if (id.Equals(null))
            {
                return BadRequest();
            }

            var request = requestService.Get(id);

            if (request.Equals(null))
            {
                return NotFound();
            }

            return Ok(request);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var requests = requestService.GetAll();

            if (requests != null)
            {
                requests.Sort((x, y) => x.User.CompareTo(y.User));
                return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(requests));
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult Save([FromBody] RequestModel element)
        {
            if (element.Equals(null))
            {
                return BadRequest();
            }

            var request = requestService.Save(element);

            if (request.Equals(null))
            {
                return NotFound();
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(request));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            bool request = requestService.Delete(id);

            if (request == false)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
