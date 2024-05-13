using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace WorkoutApp.Models
{

    [CollectionName("user")]
    public class ApplicationUser : MongoIdentityUser<Guid>
    {
    }
}
