using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using SPATestSite.Models;

namespace SPATestSite.Authorization;

public class ProfileService : IProfileService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var claims = context.Subject.Claims
            .Where(claim => claim.Type == JwtClaimTypes.Email || claim.Type == JwtClaimTypes.Name || claim.Type == JwtClaimTypes.Role)
            .ToList();

        context.IssuedClaims.AddRange(claims);

        return Task.CompletedTask;
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        var user = await _userManager.GetUserAsync(context.Subject);
        context.IsActive = user != null && (user.LockoutEnd == null || user.LockoutEnd <= DateTime.UtcNow);
    }
}
