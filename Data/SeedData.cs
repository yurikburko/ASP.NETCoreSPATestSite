﻿using Microsoft.AspNetCore.Identity;
using SPATestSite.Models;

namespace SPATestSite.Data
{
    public class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, string predefinedAdminUserPw)
        {
            // Password is set with the following:
            // dotnet user-secrets set SeedUserPW <pw>
            // The admin user can do anything

            var adminID = await EnsureUserCreated(serviceProvider, predefinedAdminUserPw, "administrator@example.com");
            await EnsureRoleCreatedAndAssignedToUser(serviceProvider, adminID, Roles.Admin);
        }

        private static async Task<string> EnsureUserCreated(IServiceProvider serviceProvider,
                                                    string testUserPw, string userEmail)
        {
            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            var user = await userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = userEmail,
                    Email = userEmail,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(user, testUserPw);
            }

            return user.Id;
        }

        private static async Task<IdentityResult> EnsureRoleCreatedAndAssignedToUser(IServiceProvider serviceProvider, string userId, string role)
        {
            var roleManager = serviceProvider.GetService<RoleManager<ApplicationRole>>();

            IdentityResult IR;
            if (!await roleManager.RoleExistsAsync(role))
            {
                IR = await roleManager.CreateAsync(new ApplicationRole(role));
            }

            var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new Exception($"The user with ID={userId} is not found.");
            }

            IR = await userManager.AddToRoleAsync(user, role);

            return IR;
        }
    }
}
