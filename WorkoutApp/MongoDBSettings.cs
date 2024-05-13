namespace WorkoutApp
{
    public class MongoDBSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string WorkoutCollectionName { get; set; } = null!;
        public string DayCollectionName { get; set; } = null!;
        public string RecordCollectionName { get; set; } = null!;
        public string UserCollectionName { get; set; } = null!;
    }
}
