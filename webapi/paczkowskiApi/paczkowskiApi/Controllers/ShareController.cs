using System.Collections.Generic;
using System.Linq;
using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using paczkowskiApi.Models;
using paczkowskiApi.security;

namespace paczkowskiApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShareController : ControllerBase
    {
        private readonly IRepository _repository;

        private User LoggedUser =>
            HttpContext.Items["user"] as User;

        public ShareController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<GetPhotosResult>> GetSharedContent(string link)
        {
            ShareBlob blob = DataEncryption.Decrypt<ShareBlob>(link);
            var sharedPhotos = new List<GetPhotosResult>();

            if (blob.ShareMode == ShareMode.SingleImage)
            {
                Photo photo = _repository.GetSharedPhoto(blob.Email, blob.PhotoNum);
                var sharedPhoto = new GetPhotosResult(photo);
                sharedPhotos.Add(sharedPhoto);
            }

            if (blob.ShareMode == ShareMode.Category)
            {
                IEnumerable<Photo> photos = _repository.GetSharedCategpry(blob.Email, blob.Category);
                IEnumerable<GetPhotosResult> getPhotosResults = photos.Select(x => new GetPhotosResult(x));
                sharedPhotos.AddRange(getPhotosResults);
            }

            return sharedPhotos;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<string> GetSharedImageLink(GetSharedImageLinkModel model)
        {
            ShareBlob blob = new ShareBlob
            {
                ShareMode = ShareMode.SingleImage,
                Email = LoggedUser.Email,
                PhotoNum = model.PhotoNum
            };

            string encryptedBlob = DataEncryption.Encrypt(blob);
            return encryptedBlob.ToUrl();

        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<string> GetSharedCategoryLink(GetSharedCategoryLinkModel model)
        {
            ShareBlob blob = new ShareBlob
            {
                ShareMode = ShareMode.Category,
                Email = LoggedUser.Email,
                Category = model.Category
            };

            string encryptedBlob = DataEncryption.Encrypt(blob);
            return encryptedBlob.ToUrl();
        }
    }
}
