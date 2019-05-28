namespace paczkowskiApi.Models
{
    public class AddPhotoModel
    {
        public string DisplayName { get; set; }
        public string FileName { get; set; }
        public string Category { get; set; }
        public byte[] Image { get; set; }
    }
}
