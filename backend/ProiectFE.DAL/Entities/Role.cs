using Microsoft.AspNetCore.Identity;

namespace ProiectFE.DAL.Entities
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
