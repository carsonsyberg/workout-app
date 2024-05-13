using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WorkoutApp.Models
{
    public class Excercise
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        public string userId { get; set; } = null!;

        public string name { get; set; } = null!;

        public string description { get; set;} = null!;

        public DateTime createdAt { get; set; }

        public DateTime startDate { get; set; }

        public int repeatSchedule { get; set; }

        public bool isFavorite { get; set; }
    }

    public enum WeightType
    {
        Cable,
        Dumbbell,
        Plate,
        DualPlate,
        DualDumbbell,
        Kettlebell,
        MedicineBall,
        Bodyweight,
    }

    public enum Difficulty
    {
        Low,
        Medium,
        High
    }
}