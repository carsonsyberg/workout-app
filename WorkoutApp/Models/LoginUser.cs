using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace WorkoutApp.Models
{
    public class LoginUser
    {
        [Required]
        public string NameOrEmail { get; set; }

        [Required]
        public string Password { get; set; }
    }
}