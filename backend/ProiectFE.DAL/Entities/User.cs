using Microsoft.AspNetCore.Identity;

namespace ProiectFE.DAL.Entities
{
    public class User : IdentityUser<int>
    {
        public string Nume { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
