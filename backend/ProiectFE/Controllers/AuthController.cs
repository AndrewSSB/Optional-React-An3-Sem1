using Microsoft.AspNetCore.Mvc;
using ProiectFE.DAL.Models;
using ProiectFE.Services.Auth;

namespace ProiectFE.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<TokenResponse>> Register([FromBody] RegisterModel model) =>
            await _authService.Register(model);

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponse>> Login([FromBody] LoginModel model) =>
            await _authService.Login(model);
    }
}
