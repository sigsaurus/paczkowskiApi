using DbContract.Entities;

namespace paczkowskiApi.Models
{
    public class GetPhotosResult
    {
        public GetPhotosResult(Photo photo)
        {
            PhotoNum = photo.PhotoNum;
            Image = photo.Image;
            Category = photo.Category;
            DisplayName = photo.DisplayName;
            FileName = photo.FileName;
        }

        public string PhotoNum { get; set; }
        public byte[] Image { get; set; }
        public string Category { get; set; }
        public string DisplayName { get; set; }
        public string FileName { get; set; }
    }
}
