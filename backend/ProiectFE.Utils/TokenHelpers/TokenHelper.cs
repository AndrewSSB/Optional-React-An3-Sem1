using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Data;
using ProiectFE.DAL;
using ProiectFE.DAL.Entities;
using Microsoft.Extensions.Configuration;
using ProiectFE.DAL.Models;

namespace ProiectFE.Utils.TokenHelpers
{
    public class TokenHelper : ITokenHelper
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        private const int userRoleValidityDaysPeriod = 1;

        public TokenHelper(AppDbContext context, UserManager<User> userManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<TokenResponse> CreateUserToken(User user)
        {
            var loginClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                loginClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = CreateToken(_configuration.GetSection("JwtSecret").Value, loginClaims, userRoleValidityDaysPeriod);

            return new TokenResponse
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
            };
        }

        #region TokenManager
        public static JwtSecurityToken CreateToken(in string jwtSettings, in List<Claim> authClaims, in int days)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings));
            string? issuer = "";
            string? audience = "";
            DateTime? expires = DateTime.UtcNow.AddDays(days);
            return new JwtSecurityToken(claims: authClaims, signingCredentials: new SigningCredentials(key, "HS256"), issuer: issuer, audience: audience, notBefore: null, expires: expires);
        }

        public static string ExtractHeaderValueJWT(in string authToken, string claimType)
        {
            string claimType2 = claimType;
            if (AuthenticationHeaderValue.TryParse(authToken, out var parsedValue))
            {
                string token = parsedValue.Parameter ?? string.Empty;
                return new JwtSecurityTokenHandler().ReadJwtToken(token).Claims?.FirstOrDefault((Claim x) => x.Type == (claimType2 ?? ""))?.Value ?? string.Empty;
            }

            throw new NoNullAllowedException("Couldn't parse authorization token from header / bearer token is null");
        }

        public static string ExtractValuesFromToken(in string token, string claimType)
        {
            string claimType2 = claimType;
            return new JwtSecurityTokenHandler().ReadJwtToken(token).Claims?.FirstOrDefault((Claim x) => x.Type == (claimType2 ?? ""))?.Value ?? string.Empty;
        }

        private static TokenValidationParameters GetValidationParameters(string jwtSettings)
        {
            return new TokenValidationParameters
            {
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidIssuer = "",
                ValidAudience = "",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings))
            };
        }

        /*public static async Task<bool> ValidateToken(string jwtSettings, string authToken)
        {
            authToken = authToken.Split(" ")[1];
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = GetValidationParameters(jwtSettings);
            if ((await jwtSecurityTokenHandler.ValidateTokenAsync(authToken, validationParameters)).IsValid)
            {
                return true;
            }

            return false;
        }*/
        #endregion
    }
}
