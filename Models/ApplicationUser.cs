#nullable disable

using Microsoft.AspNetCore.Identity;

namespace SPATestSite.Models
{
    public class ApplicationUser : IdentityUser
    {
        public byte[] Avatar { get; set; }
        public string AvatarFileType { get; set; }
        public int LoginsCount { get; set; }

        public DateTime? LastLoginDate { get; set; }

        // Navigation properties
        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }
    }

    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base()
        {
        }

        public ApplicationRole(string roleName) : base(roleName)
        {
        }

        // Navigation properties
        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }
    }

    public class ApplicationUserRole : IdentityUserRole<string>
    {
        public virtual ApplicationUser User { get; set; }
        public virtual ApplicationRole Role { get; set; }
    }
}
