using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using WorkoutApp.Services;
using WorkoutApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace WorkoutApp.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    //[Authorize]
    public class OperationsController : Controller
    {
        private UserManager<ApplicationUser> userManager;
        private RoleManager<ApplicationRole> roleManager;

        public OperationsController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser appUser = new ApplicationUser
                {
                    UserName = user.Name,
                    Email = user.Email,
                };

                IdentityResult result = await userManager.CreateAsync(appUser, user.Password);

                if (result.Succeeded)
                {
                    return Ok(true);
                    //return Ok("User created successfully");
                }

                foreach (IdentityError error in result.Errors)
                {
                    return BadRequest(error.Description);
                }
            }

            return BadRequest("Error creating user");
        }

        [HttpPost("[action]/{name}")]
        public async Task<IActionResult> CreateRole([Required] string name)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await roleManager.CreateAsync(new ApplicationRole() { Name = name });

                if (result.Succeeded)
                    return Ok("Role created successfully");

                foreach (IdentityError error in result.Errors)
                    return BadRequest(error.Description);
            }

            return BadRequest("Error creating user");
        }
    }
}
