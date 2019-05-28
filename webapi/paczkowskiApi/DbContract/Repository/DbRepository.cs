using System;
using System.Collections.Generic;
using System.Linq;
using Commons;
using DbContract.Entities;
using DbContract.RepositoryContract;
using DbContract.WebApiDbContext;
using Microsoft.EntityFrameworkCore;

namespace DbContract.Repository
{
    public class DbRepository : IRepository
    {
        ApiDbContext dbContext = new ApiDbContext(new DbContextOptions<ApiDbContext>());

        public void Dispose() =>
            dbContext.Dispose();

        public string AddPhoto(Photo photo)
        {
            var user = dbContext.Users.Include(p => p.Photos).Single(u => u.Id == photo.User.Id);
            user.Photos.Add(photo);
            dbContext.SaveChanges();

            return "ok";
        }

        public string AddUser(User user)
        {
            try
            {
                var existingUser = dbContext.Users.Where(x => x.Email == user.Email).FirstOrDefault();

                if (existingUser != null)
                    throw new Exception($"User [{user.Email}] already exists");

                dbContext.Add(user);
                dbContext.SaveChanges();
                return "ok";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public IEnumerable<User> GetAllUsers()
        {
            return dbContext.Users.ToListAsync().Result;
        }

        public User GetUserByEmail(string email) =>
            dbContext.Users.Where(user => user.Email == email.Sanitize()).First();

        public string GetPasswordHash(string email)
        {
            var user = dbContext.Users.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
            if (user != null)
                return user.Password;
            return string.Empty;
        }

        public void AddLoggedUser(LoggedUser loggedUser)
        {
            var user = dbContext.LoggedUsers.Where(users => users.Email == loggedUser.Email.Sanitize()).FirstOrDefault();

            if (user != null)
            {
                user.Token = loggedUser.Token;
                dbContext.Update(user);
            }
            else
                dbContext.Add(loggedUser);

            dbContext.SaveChanges();
        }

        public void RemoveLoggedUser(string email)
        {
            if (email != null)
            {
                var user = dbContext.LoggedUsers.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
                if (user != null)
                {
                    dbContext.Remove(user);
                    dbContext.SaveChanges();
                }
            }
        }

        public string GetActiveToken(string email)
        {
            if (email != null)
            {
                var user = dbContext.LoggedUsers.Where(users => users.Email == email.Sanitize()).FirstOrDefault();
                if (user != null)
                    return user.Token;
            }

            return string.Empty;
        }

        public IEnumerable<Photo> GetUserPhotos(User user)
        {
            var result = dbContext.Photos.Where(p => p.User.Id == user.Id);
            return result;
        }

        public IEnumerable<Photo> GetPhotosForCategory(User user, string category) =>
            dbContext.Photos.Where(p => p.User.Id == user.Id && p.Category == category.Sanitize());

        public IEnumerable<Photo> GetUncategorizedPhotos(User user) =>
            dbContext.Photos.Where(p => p.User.Id == user.Id && p.Category == string.Empty);

        public void EditPhoto(Photo photo)
        {
            var dbPhoto = dbContext.Photos.Single(p => p.PhotoNum == photo.PhotoNum && p.User.Id == photo.User.Id);
            dbPhoto.Category = photo.Category;
            dbPhoto.DisplayName = photo.DisplayName;

            dbContext.Update(dbPhoto);
            dbContext.SaveChanges();
        }

        public void DeletePhoto(Photo photo)
        {
            var dbPhoto = dbContext.Photos.Single(p => p.PhotoNum == photo.PhotoNum && p.User.Id == photo.User.Id);
            dbContext.Remove(dbPhoto);
            dbContext.SaveChanges();
        }

        public IEnumerable<string> GetCategories(User user) =>
            dbContext.Photos.Include(u => u.User).
            Where(p => p.User.Id == user.Id && p.Category != string.Empty).
            Select(c => c.Category).
            Distinct();

        public void DeleteCategory(User user, string category)
        {
            IEnumerable<Photo> photos = dbContext.Photos.Where(p => p.Category == category && p.User.Id == user.Id);
            dbContext.RemoveRange(photos);
            dbContext.SaveChanges();
        }

        public void EditCategory(User user, string oldCategory, string newCategory)
        {
            bool alreadyExists = dbContext.Photos.Where(p => p.Category == newCategory && p.User.Id == user.Id).Select(p => p.Category).Any();
            if (alreadyExists)
                throw new Exception($"Category [{newCategory}] already exists");

            IEnumerable<Photo> photos = dbContext.Photos.Where(p => p.Category == oldCategory && p.User.Id == user.Id);
            foreach (var photo in photos)
                photo.Category = newCategory;

            dbContext.UpdateRange(photos);
            dbContext.SaveChanges();
        }

        public Photo GetSharedPhoto(string email, string photoNum)
        {
            Photo photo = dbContext.Photos.Where(p => p.User.Email == email && p.PhotoNum == photoNum).FirstOrDefault();
            if (photo != null)
                return photo;

            throw new Exception("Image not found");
        }

        public IEnumerable<Photo> GetSharedCategpry(string email, string category)
        {
            IEnumerable<Photo> photos = dbContext.Photos.Where(p => p.User.Email == email && p.Category == category);
            if (photos != null)
                return photos;

            throw new Exception("Category not found");
        }
    }
}
