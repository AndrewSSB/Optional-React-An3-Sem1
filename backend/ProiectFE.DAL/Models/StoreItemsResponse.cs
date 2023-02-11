using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProiectFE.DAL.Models
{
    public class StoreItemsResponse
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public float Price { get; set; }
        public string Image { get; set; }
        public int Stock { get; set; }
    }
}
