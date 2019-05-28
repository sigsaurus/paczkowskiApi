using System;
using System.Collections.Generic;
using System.Text;
using DbContract.Entities;

namespace DbContract.RepositoryContract
{
    public interface IRepository : IDisposable
    {
        string AddUser(User user);
        IEnumerable<User> GetAllUsers();
        User GetUserByEmail(string email);
        string AddPhoto(Photo photo);
        string GetPasswordHash(string email);
        void RemoveLoggedUser(string email);
        void AddLoggedUser(LoggedUser user);
        string GetActiveToken(string email);
        IEnumerable<Photo> GetUserPhotos(User user);
        IEnumerable<Photo> GetPhotosForCategory(User user, string category);
        IEnumerable<Photo> GetUncategorizedPhotos(User user);
        void EditPhoto(Photo photo);
        void DeletePhoto(Photo photo);
        IEnumerable<string> GetCategories(User user);
        void DeleteCategory(User user, string category);
        void EditCategory(User user, string oldCategory, string newCategory);
        Photo GetSharedPhoto(string email, string photoNum);
        IEnumerable<Photo> GetSharedCategpry(string email, string category);
    }
}
