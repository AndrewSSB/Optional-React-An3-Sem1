using Microsoft.EntityFrameworkCore;
using ProiectFE.DAL;
using ProiectFE.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProiectFE.Services.StoreServices
{
    public class StoreService : IStoreService
    {
        private readonly AppDbContext _context;

        public StoreService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<StoreItemsResponse>> GetItems()
        {
            var response = await _context.StoreItems
                .Select(x => new StoreItemsResponse 
                { 
                    Id= x.Id,
                    Image = x.Image, 
                    ItemName = x.ItemName, 
                    Price = x.Price,
                    Stock = x.Stock 
                }).ToListAsync();
            
            return response;
        }
    }
}
