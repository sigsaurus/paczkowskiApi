using System;
using System.Collections.Generic;
using System.Linq;
using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using paczkowskiApi.Models;

namespace paczkowskiApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IRepository _repository;

        private User LoggedUser =>
            HttpContext.Items["user"] as User;


        public PhotoController(IRepository repository)
        {
            _repository = repository;
        }

        // POST api/values
        [HttpPost]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> AddPhoto(AddPhotoModel photoModel)
        {
            try
            {
                Photo photo = GetPhotoEntity(photoModel);
                _repository.AddPhoto(photo);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<GetPhotosResult>> GetPhotos()
        {
            var photos = _repository.GetUserPhotos(LoggedUser);
            var result = photos.Select(x => new GetPhotosResult(x)).ToArray();

            return result;
        }

        [HttpGet("{category}")]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<GetPhotosResult>> GetPhotosForCategory(string category)
        {
            var photos = _repository.GetPhotosForCategory(LoggedUser, category);
            var result = photos.Select(x => new GetPhotosResult(x)).ToArray();

            return result;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<GetPhotosResult>> GetUncategorizedPhotos()
        {
            var photos = _repository.GetUncategorizedPhotos(LoggedUser);
            var result = photos.Select(x => new GetPhotosResult(x)).ToArray();

            return result;
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> EditPhoto(EditPhotoModel photoModel)
        {
            try
            {
                var photo = new Photo
                {
                    PhotoNum = photoModel.PhotoNum,
                    Category = photoModel.Category,
                    DisplayName = photoModel.DisplayName,
                    User = LoggedUser
                };

                _repository.EditPhoto(photo);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> DeletePhoto(DeletePhotoModel photoModel)
        {
            try
            {
                _repository.DeletePhoto(new Photo { PhotoNum = photoModel.PhotoNum, User = LoggedUser });
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<CategoryModel>> GetCategories()
        {
            var categories = _repository.GetCategories(LoggedUser);
            var result = categories.Select(category => new CategoryModel { Name = category }).ToArray();

            return result;
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<bool> DeleteCategory(CategoryModel model)
        {
            try
            {
                _repository.DeleteCategory(LoggedUser, model.Name);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<string> EditCategory(EditCategoryModel model)
        {
            try
            {
                _repository.EditCategory(LoggedUser, model.OldCategory.Sanitize(), model.NewCategory.Sanitize());
                return "SUCCESS";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        private Photo GetPhotoEntity(AddPhotoModel model)
        {
            return new Photo
            {
                User = LoggedUser,
                Category = model.Category,
                DisplayName = model.DisplayName,
                FileName = model.FileName,
                PhotoNum = DateTime.Now.Ticks.ToString(),
                Image = model.Image
            };
        }


    }
}
