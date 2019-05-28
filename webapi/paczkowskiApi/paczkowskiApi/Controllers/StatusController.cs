using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using paczkowskiApi.Models;
using paczkowskiApi.security;

namespace paczkowskiApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        [HttpGet]
        public ActionResult IsAlive(string link)
        {
            return new JsonResult(
                new
                {
                    IsAvlive = true,
                    code = Response.StatusCode
                });

        }
    }
}
