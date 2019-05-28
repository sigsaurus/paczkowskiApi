using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DbContract.WebApiDbContext
{
    public class ApiDbContextDbContextFactory : IDesignTimeDbContextFactory<ApiDbContext>
    {
        public ApiDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ApiDbContext>();
            string connection = @"Server=(localdb)\mssqllocaldb;Database=photosdb;Trusted_Connection=True;ConnectRetryCount=0";
            builder.UseSqlServer(connection);

            return new ApiDbContext(builder.Options);
        }
    }
}
