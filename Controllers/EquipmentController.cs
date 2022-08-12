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
    public class EquipmentController : Controller
    {
        private readonly IRepository<BrandModelDim> _brandModelRepo;
        private readonly IRepository<ClubDim> _clubRepo;
        private readonly IRepository<ProductTypeDim> _productTypeRepo;



        public EquipmentController(
            IRepository<BrandModelDim> brandModelRepo,
            IRepository<ClubDim> clubRepo,
            IRepository<ProductTypeDim> productTypeRepo)
        {
            _brandModelRepo = brandModelRepo;
            _clubRepo = clubRepo;
            _productTypeRepo = productTypeRepo;
        }

        // GET: api/clubs
        [HttpGet("clubs")]
        public async Task<List<ClubDim>> GetClubs()
        {
            return await _clubRepo.GetAll();
        }

        // GET api/brand-models
        [HttpGet("brand-models")]
        public async Task<List<BrandModelDim>> GetBrandModels()
        {
            return await _brandModelRepo.GetAll();
        }

        // GET api/brand-models
        [HttpGet("product-types")]
        public async Task<List<ProductTypeDim>> GetProductTypes()
        {
            return await _productTypeRepo.GetAll();
        }
    }
}

