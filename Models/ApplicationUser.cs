#nullable disable

using Microsoft.AspNetCore.Identity;

namespace SPATestSite.Models
{
    public class ApplicationUser : IdentityUser
    {
        public byte[] Avatar { get; set; }
        public string AvatarFileType { get; set; }

    }
}