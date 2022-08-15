using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LIVLens.Interfaces;
using LIVLens.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LIVLens.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class BrandsController : Controller
    {

        private readonly IRepository<BrandDim> _brandRepo;
        private readonly IRepository<BrandModelDim> _brandModelRepo;


        public BrandsController(IRepository<BrandDim> brandRepo, IRepository<BrandModelDim> brandModelRepo)
        {
            _brandRepo = brandRepo;
        }

        [HttpGet]
        public async Task<IEnumerable<BrandDim>> GetBrands()
        {
            return await _brandRepo.GetAll();
        }

        [HttpGet("brand-models")]
        public async Task<IEnumerable<BrandModelDim>> GetBrandModels()
        {
            return await _brandModelRepo.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<BrandDim> GetBrandById(int id)
        {
            return await _brandRepo.FindById(id);
        }

        [HttpGet("brand-models/{id}")]
        public async Task<BrandModelDim> GetBrandModelById(int id)
        {
            return await _brandModelRepo.FindById(id);
        }

        // POST api/values
        [HttpPost]
        public async Task AddBrand([FromBody] BrandDim brand)
        {
            await _brandRepo.Add(brand);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task UpdateBrand(int id, [FromBody] BrandDim brand)
        {
            await _brandRepo.Update(brand);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void DeleteBrand(int id)
        {
            var brandToDelete = await _brandRepo.FindById(id);

            if(brandToDelete != null)
            {
                await _brandRepo.Delete(brandToDelete);
            }
        }

        [HttpPost("brand-models")]
        public async Task AddBrandModel([FromBody] BrandModelDim brandModel)
        {
            await _brandModelRepo.Add(brandModel);
        }

        [HttpPut("brand-models/{id}")]
        public async Task UpdateBrandModel(int id, [FromBody] BrandModelDim brandModel)
        {
            await _brandModelRepo.Update(brandModel);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void DeleteBrandModel(int id)
        {
            var brandModelToDelete = await _brandModelRepo.FindById(id);

            if(brandModelToDelete != null)
            {
                await _brandModelRepo.Delete(brandModelToDelete);
            }
        }
    }
}

