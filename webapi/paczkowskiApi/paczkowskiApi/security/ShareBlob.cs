namespace paczkowskiApi.security
{
    public enum ShareMode
    {
        NotSet,
        SingleImage,
        Category
    }
    public class ShareBlob
    {
        public ShareMode ShareMode { get; set; }
        public string Email { get; set; }
        public string PhotoNum { get; set; }
        public string Category { get; set; }
    }
}
