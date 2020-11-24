using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebApp.Services.Interfaces;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonitorController : ControllerBase
    {
        private IMonitorService monitorService;

        public MonitorController(IMonitorService monitorService)
        {
            this.monitorService = monitorService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var monitors = monitorService.GetAll();

            if (monitors != null)
            {
                return Ok(monitors);
            }

            return NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            if (id.Equals(null))
            {
                return BadRequest();
            }

            var monitor = monitorService.Get(id);

            if (monitor.Equals(null))
            {
                return NotFound();
            }

            return Ok(monitor);
        }

        [HttpPost]
        public IActionResult Save([FromBody]MonitorModel element)
        {
            if (element == null)
            {
                return BadRequest();
            }

            var monitor = monitorService.Save(element);

            if (monitor == null)
            {
                return NotFound();
            }

            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(monitor));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            bool monitor = monitorService.Delete(id);

            if (monitor == false)
            {
                return NotFound();
            }

            return Ok();
        }

    }
}