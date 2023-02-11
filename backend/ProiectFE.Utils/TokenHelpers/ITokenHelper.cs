using ProiectFE.DAL.Entities;
using ProiectFE.DAL.Models;

namespace ProiectFE.Utils.TokenHelpers
{
    public interface ITokenHelper
    {
        Task<TokenResponse> CreateUserToken(User user);
    }
}
