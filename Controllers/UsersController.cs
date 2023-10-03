using AutoMapper;
using Duende.IdentityServer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;
using SPATestSite.Helpers;
using SPATestSite.Models;
using SPATestSite.Models.DTO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Runtime.InteropServices;

namespace UserManagementReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
		private readonly ILogger<UsersController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UsersController(
			ILogger<UsersController> logger,
            IMapper mapper,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IWebHostEnvironment webHostEnvironment)
		{
			_logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _webHostEnvironment = webHostEnvironment;

        }

        // GET: api/users
        [HttpGet]
        public async Task<List<UserModel>> Get()
        {
			return await GetUsers();
        }

		// GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> Get(string id)
		{
            var user = (await GetUsers(u => u.Id == id))
                .SingleOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
		}

        // POST: api/users/5/assign-admin-role
        [HttpPost("{id}/assign-admin-role")]
        [Authorize("IsAdmin")]
        public async Task<ActionResult<UserModel>> AssignAdminRole(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

			if (await _userManager.IsInRoleAsync(user, Roles.Admin))
			{
				return BadRequest(new { message = "User is already assigned to the Admin role." });
			}

			var result = await _userManager.AddToRoleAsync(user, Roles.Admin);
            if (!result.Succeeded)
			{
                return Problem($"An error occurred while assigning user {user.UserName}(Id={user.Id}) to the Admin role.", result);
            }

            return NoContent();
        }

        // POST: api/users/5/unassign-admin-role
        [HttpPost("{id}/unassign-admin-role")]
        [Authorize("IsAdmin")]
        public async Task<ActionResult<UserModel>> UnassignAdminRole(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            if (!await _userManager.IsInRoleAsync(user, Roles.Admin))
            {
                return BadRequest(new { message = "User is not assigned to the Admin role." });
            }

            var result = await _userManager.RemoveFromRoleAsync(user, Roles.Admin);
            if (!result.Succeeded)
            {
                return Problem($"An error occurred while unassigning user {user.UserName}(Id={user.Id}) from the Admin role.", result);
            }

            return NoContent();
        }        

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        [Authorize("IsAdmin")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return Problem($"An error occurred while deleting user {user.UserName}(Id={user.Id}).", result);
            }

            return NoContent();
        }

        // GET: api/users/5/avatar
        [HttpGet("{id}/avatar")]
        [Authorize(AuthenticationSchemes = "Identity.Application")]
        public async Task<IActionResult> UserAvatar(string id, int size)
        {
            if (size == default(int))
            {
                size = 48;
            }

            var avatarBytes = await _userManager.Users
                .Where(u => u.Id == id)
                .Select(u => u.Avatar)
                .SingleOrDefaultAsync();

            if (avatarBytes == null || avatarBytes.Length == 0)
            {
                string defaultAvatarPath = Path.Combine(_webHostEnvironment.WebRootPath, "Images/default_avatar.png");
                avatarBytes = System.IO.File.ReadAllBytes(defaultAvatarPath);
                //return NotFound();
            }

            byte[] scaledImageData;

            try
            {
                using (var stream = new MemoryStream(avatarBytes))
                {
                    var result = ImageHelper.ScaleImageWithCropFit(stream, size, size);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        result.CopyTo(ms);
                        scaledImageData = ms.GetBuffer();
                    }
                }
            }
            catch
            {
                // System.Drawing.Common only supported on Windows
                // so the code above will not work on linux
                // TODO. Find better solution for avatars handling/resising - use external image service (and optionally storage) instead
                scaledImageData = avatarBytes;
            }

            return File(scaledImageData, ImageHelper.JpegContentType);
        }


        private async Task<List<UserModel>> GetUsers(Func<ApplicationUser, bool> filterPredicate = null)
        {
            var query = _userManager.Users.AsNoTracking();

            if (filterPredicate != null)
            {
                query.Where(filterPredicate);
            }

            var usersFromDb = await query.ToListAsync();

            List<UserModel> result = new List<UserModel>();
            foreach (var u in usersFromDb)
            {
                var userDTO = _mapper.Map<UserModel>(u);
                userDTO.IsAdmin = await _userManager.IsInRoleAsync(u, Roles.Admin);
                result.Add(userDTO);
            }

            return result;
        }

        private ObjectResult Problem(string title, IdentityResult identityResult)
        {
            return Problem(
                    title: title,
                    detail: string.Join("\n", identityResult.Errors.Select(x => $"{x.Description} (code:{x.Code})")),
                    statusCode: (int)HttpStatusCode.InternalServerError);
        }
	}
}
