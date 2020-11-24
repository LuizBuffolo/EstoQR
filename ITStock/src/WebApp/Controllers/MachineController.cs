using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services.Interfaces;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private IMachineService machineService;
        public MachineController(IMachineService machineService)
        {
            this.machineService = machineService;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            if (id.Equals(null))
            {
                return BadRequest();
            }

            var machine = machineService.Get(id);

            if (machine.Equals(null))
            {
                return NotFound();
            }

            return Ok(machine);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var machines = machineService.GetAll();

            if (machines != null)
            {
                machines.Sort((x, y) => x.Hostname.CompareTo(y.Hostname));
                return Ok(machines);
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult Save([FromBody]MachineModel element)
        {
            if (element.Equals(null))
            {
                return BadRequest();
            }

            var machine = machineService.Save(element);

            if (machine.Equals(null))
            {
                return NotFound();
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(machine));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            bool machine = machineService.Delete(id);

            if (machine == false)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}