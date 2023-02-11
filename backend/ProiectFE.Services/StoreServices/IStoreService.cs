using ProiectFE.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProiectFE.Services.StoreServices
{
    public interface IStoreService
    {
        Task<List<StoreItemsResponse>> GetItems(); 
    }
}
