using System.Text.RegularExpressions;

namespace Commons
{
    public static class StringExtensions
    {
        public static string Sanitize(this string s) =>
            s.Trim().ToLower();

        public static string ToUrl(this string s) =>
            s.Replace("+", "%2B");

        public static string Clean(this string s)
        {
            Regex regex = new Regex(@"^{|}|,|\(|\)|=|'|<|>");
            return regex.Replace(s, string.Empty);
        }
    }
}
