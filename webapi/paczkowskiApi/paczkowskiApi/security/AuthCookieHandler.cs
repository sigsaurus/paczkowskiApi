using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Commons;
using DbContract.Entities;
using DbContract.Repository;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace paczkowskiApi.security
{
    public class AuthCookieHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public AuthCookieHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock) : base(options, logger, encoder, clock)
        {

        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var cookies = Request.Cookies;
            Task<AuthenticateResult> result = Task.FromResult(AuthenticateResult.NoResult());

            string authToken = cookies[CookieName.AuthToken];
            AuthTokenBlob tokenBlob = DataEncryption.Decrypt<AuthTokenBlob>(authToken);

            if (IsAuthorized(tokenBlob))
            {
                var identity = new ClaimsIdentity(nameof(AuthCookieHandler));
                var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name);
                User user = GetUser(tokenBlob.Email);
                Context.Items.Add("user", user);
                result = Task.FromResult(AuthenticateResult.Success(ticket));
            }

            return result;
        }

        private User GetUser(string email)
        {
            using (IRepository repo = new DbRepository())
            {
                User user = repo.GetUserByEmail(email);
                return user;
            }
        }

        private bool IsAuthorized(AuthTokenBlob tokenBlob)
        {
            using (IRepository repo = new DbRepository())
            {
                string token = repo.GetActiveToken(tokenBlob.Email);
                return token == tokenBlob.Token;
            }
        }
    }
}
