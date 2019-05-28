using Commons;

namespace paczkowskiApi.Models
{
    public class RegisterUserModel
    {
        private string _email;

        public string Email
        {
            get { return _email; }
            set { _email = value.Sanitize(); }
        }
        public string Password { get; set; }
        public string Name { get; set; }
    }
}
