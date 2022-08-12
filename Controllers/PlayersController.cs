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
    public class PlayersController : Controller
    {
        private readonly IRepository<PlayerDim> _playerRepo;

        public PlayersController(IRepository<PlayerDim> playerRepo)
        {
            _playerRepo = playerRepo;
        }

        // GET: api/values
        [HttpGet]
        public async Task<List<PlayerDim>> Get()
        {
            return await _playerRepo.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<PlayerDim> Get(int id)
        {
            return await _playerRepo.FindById(id);
        }

        // POST api/values
        [HttpPost]
        public async void Post([FromBody] PlayerDim newPlayer)
        {
            await _playerRepo.Add(newPlayer);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] PlayerDim updatedPlayer)
        {
            await _playerRepo.Update(updatedPlayer);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            var playerToDelete = await Get(id);
            await _playerRepo.Delete(playerToDelete);
        }
    }
}

