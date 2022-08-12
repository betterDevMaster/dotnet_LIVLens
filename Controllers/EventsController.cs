using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LIVLens.Interfaces;
using LIVLens.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LIVLens.Controllers
{
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
        private readonly IRepository<EventDim> _eventRepo;

        public EventsController(IRepository<EventDim> eventRepo)
        {
            _eventRepo = eventRepo;
        }

        // GET: api/values
        [HttpGet]
        public async Task<List<EventDim>> Get()
        {
            return await _eventRepo.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<EventDim> Get(int id)
        {
            return await _eventRepo.FindById(id);
        }

        // POST api/values
        [HttpPost]
        public async void Post([FromBody] EventDim newEvent)
        {
            await _eventRepo.Add(newEvent);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] EventDim updatedEvent)
        {
            await _eventRepo.Update(updatedEvent);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            var eventToDelete = await Get(id);
            await _eventRepo.Delete(eventToDelete);
        }
    }
}

