using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace WorkoutApp.Models
{
    public class Day
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        public string workoutId { get; set; } = null!;

        public string name { get; set; } = null!;

        public int? order { get; set; } = 0;

        public string dayOfWeek { get; set; } = null!;

        public List<Set>? sets { get; set; } = new List<Set>();

    }
    public class Set
    {
        public string name { get; set; } = null!;
        public int order { get; set; } = 0;
        public List<Rep>? reps { get; set; } = new List<Rep>();
    }

    public class Rep
    {
        public int? numReps { get; set; } = null;
        public int? weight { get; set; } = null;
    }
}
