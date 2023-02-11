using Microsoft.AspNetCore.Mvc;
using ProiectFE.DAL.Models;
using ProiectFE.Services.StoreServices;

namespace ProiectFE.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public StoreController(IStoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpGet("items")]
        public async Task<ActionResult<List<StoreItemsResponse>>> GetItems() =>
            await _storeService.GetItems();
    }
}
