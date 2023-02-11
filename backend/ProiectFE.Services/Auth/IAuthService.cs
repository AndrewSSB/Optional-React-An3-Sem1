using ProiectFE.DAL.Models;

namespace ProiectFE.Services.Auth
{
    public interface IAuthService
    {
        Task<TokenResponse> Register(RegisterModel model);
        Task<TokenResponse> Login(LoginModel model);
    }
}
