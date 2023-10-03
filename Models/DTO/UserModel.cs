using Microsoft.AspNetCore.Identity;

namespace SPATestSite.Models.DTO
{
    public class UserModel
    {
        public string? Id { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public bool TwoFactorEnabled { get; set; }

        public bool IsAdmin { get; set; }
    }
}
