using Commons;

namespace paczkowskiApi.security
{
    public class AuthTokenBlob
    {
        private string _email;
        public AuthTokenBlob() { }

        public AuthTokenBlob(string email, string token)
        {
            Email = email;
            Token = token;
        }

        public string Email
        {
            get { return _email; }
            set { _email = value.Sanitize(); }
        }
        public string Token { get; set; }
    }
}
