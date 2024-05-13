using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using WorkoutApp.Services;
using WorkoutApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Encodings.Web;
using System.Text;

namespace WorkoutApp.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("[action]")]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody] LoginUser user)
        {

            string userOrEmail = user.NameOrEmail;
            string password = user.Password;

            if (ModelState.IsValid)
            {
                ApplicationUser? appUser = await userManager.FindByEmailAsync(userOrEmail);
                if (appUser == null)
                {
                    Console.WriteLine("NO EMAIL FOUND");
                    appUser = await userManager.FindByNameAsync(userOrEmail);
                }

                if (appUser != null)
                {
                    Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(appUser, password, false, false);
                    if (result.Succeeded)
                    {
                        Console.WriteLine("LOGIN SUCCESS");
                        return Ok(true);
                        //return Ok("Logged in as " + appUser.Id);
                    }
                    //return BadRequest("Error logging in: result failed.");
                    Console.WriteLine("LOGIN FAIL");

                    return BadRequest(false);
                }
                //return BadRequest("No user found with that email or username.");

                Console.WriteLine("NO USERNAME FOUND");
            }

            Console.WriteLine("Model Invalid");
            //return Ok(false);
            return BadRequest(false);
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok(true);
        }
    }
}
