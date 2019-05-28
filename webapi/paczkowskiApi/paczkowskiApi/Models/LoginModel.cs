using Commons;

namespace paczkowskiApi.Models
{
    public class LoginModel
    {
        private string _email;

        public string Email
        {
            get { return _email; }
            set { _email = value.Sanitize(); }
        }
        public string Password { get; set; }
    }
}
