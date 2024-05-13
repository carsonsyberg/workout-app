using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WorkoutApp.Models
{
    public class Record
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }
        public string workoutId { get; set; } = null!;
        public string dayId { get; set; } = null!;
        public int? setIndex { get; set; } = null;
        public int? repIndex { get; set; } = null;
        public string excerciseName { get; set; } = null!;
        public int? numReps { get; set; } = null;
        public int? weight { get; set; } = null;
        public DateTime dateCompleted { get; set; }
    }
}