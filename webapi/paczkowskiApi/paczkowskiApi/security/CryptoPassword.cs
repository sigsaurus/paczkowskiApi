using System.Security.Cryptography;
using System.Text;

namespace paczkowskiApi.security
{
    public class CryptoPassword
    {
        private const string _salt = "9A12bc1c7_c19bc391_798";

        public static string GetPasswordHash(string password)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] hashBytes = md5Hash.ComputeHash(Encoding.ASCII.GetBytes(password + _salt));
                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < hashBytes.Length; i++)
                    sb.Append(hashBytes[i].ToString("x2"));

                return sb.ToString();
            }
        }
    }
}
