using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ProiectFE.DAL;
using ProiectFE.DAL.Entities;
using ProiectFE.DAL.Models;
using ProiectFE.Utils.TokenHelpers;

namespace ProiectFE.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AppDbContext _context;
        private readonly ITokenHelper _tokenHelper;
        
        public AuthService(UserManager<User> userManager,
            SignInManager<User> signInManager,
            AppDbContext context,
            ITokenHelper tokenHelper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _tokenHelper = tokenHelper;
        }

        public async Task<TokenResponse> Register(RegisterModel model)
        {
            var existingUserByEmail = await _userManager.FindByEmailAsync(model.Email);

            if (existingUserByEmail is not null)
            {
                return new TokenResponse();
            }

            User user = new()
            {
                Nume = model.Name,
                UserName = model.Email,
                Email = model.Email,
            };

            var userCreationResult = await _userManager.CreateAsync(user, model.Password);
            if (!userCreationResult.Succeeded)
            {
                return new TokenResponse();
            }

            await _userManager.AddToRoleAsync(user, RoleNames.User);

            var registerToken = await _tokenHelper.CreateUserToken(user);

            return new TokenResponse { AccessToken = registerToken.AccessToken };
        }

        public async Task<TokenResponse> Login(LoginModel model)
        {
            if (string.IsNullOrEmpty(model.Email)) { return new TokenResponse(); }

            var user = await _userManager.FindByEmailAsync(model.Email ?? "");

            if (user is null)
            {
                return new TokenResponse();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, true);

            if (result.Succeeded)
            {
                var loginResponse = await _tokenHelper.CreateUserToken(user);

                return new TokenResponse { AccessToken = loginResponse.AccessToken };
            }

            return new TokenResponse();
        }
    }
}
