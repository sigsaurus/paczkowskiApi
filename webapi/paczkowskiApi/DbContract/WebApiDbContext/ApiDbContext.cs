using DbContract.Entities;
using Microsoft.EntityFrameworkCore;

namespace DbContract.WebApiDbContext
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(i => i.Email)
                .IsUnique();

            modelBuilder.Entity<LoggedUser>()
                .HasIndex(i => i.Email)
                .IsUnique();

            modelBuilder.Entity<Photo>()
                .HasIndex(i => i.PhotoNum)
                .IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connection = @"Server=(localdb)\mssqllocaldb;Database=photosdb;Trusted_Connection=True;ConnectRetryCount=0";
            optionsBuilder.UseSqlServer(connection);
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<LoggedUser> LoggedUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}
