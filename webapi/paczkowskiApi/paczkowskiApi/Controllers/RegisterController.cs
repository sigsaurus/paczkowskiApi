using System.Collections.Generic;
using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using paczkowskiApi.Models;
using paczkowskiApi.security;

namespace paczkowskiApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        IRepository _repository;

        public RegisterController(IRepository repository)
        {
            _repository = repository;
        }


        [HttpPost]
        public ActionResult<string> NewUser(RegisterUserModel registerModel)
        {
            var user = new User
            {
                Email = registerModel.Email,
                Name = registerModel.Name,
                Password = CryptoPassword.GetPasswordHash(registerModel.Password)
            };

            var result = _repository.AddUser(user);
            return result;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = AuthScheme.Cookies)]
        public ActionResult<IEnumerable<User>> GetAllUsers()
        {
            var result = _repository.GetAllUsers();
            return new JsonResult(result);
        }
    }
}
