using Microsoft.AspNetCore.Identity;
using ProiectFE.DAL.Entities;

namespace ProiectFE.DAL
{
    public static class RoleSeeder
    {
        public static void AddRoles(this RoleManager<Role> roleManager)
        {
            var roles = roleManager.Roles.ToList();

            if (roles.Count != 0) return;

            string[] roleNames =
            {
                "User",
                "Admin"
            };

            foreach (var roleName in roleNames)
            {
                var role = new Role { Name = roleName };

                roleManager.CreateAsync(role).Wait();
            }
        }
    }
}
