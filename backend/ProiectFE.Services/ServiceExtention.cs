using Microsoft.Extensions.DependencyInjection;
using ProiectFE.Services.Auth;
using ProiectFE.Services.StoreServices;
using ProiectFE.Utils.TokenHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProiectFE.Services
{
    public static class ServiceExtention
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ITokenHelper, TokenHelper>();
            services.AddTransient<IStoreService, StoreService>();
        }
    }
}
