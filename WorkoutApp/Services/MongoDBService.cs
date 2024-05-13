using WorkoutApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace WorkoutApp.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Workout> _workoutCollection;
        private readonly IMongoCollection<Day> _dayCollection;
        private readonly IMongoCollection<Record> _recordCollection;
        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _workoutCollection = database.GetCollection<Workout>(mongoDBSettings.Value.WorkoutCollectionName);
            _dayCollection = database.GetCollection<Day>(mongoDBSettings.Value.DayCollectionName);
            _recordCollection = database.GetCollection<Record>(mongoDBSettings.Value.RecordCollectionName);
        }

        // ******************** Workouts ******************** //
        public async Task<List<Workout>> GetWorkoutAsync()
        {
            return await _workoutCollection.Find(new BsonDocument()).ToListAsync();
        }
        public async Task<Workout> GetWorkoutByIdAsync(string id)
        {
            FilterDefinition<Workout> filter = Builders<Workout>.Filter.Eq("id", id);
            return await _workoutCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<Workout> GetFavoriteWorkoutAsync()
        {
            FilterDefinition<Workout> filter = Builders<Workout>.Filter.Eq("isFavorite", true);
            return await _workoutCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task CreateWorkoutAsync(Workout workout)
        {
            await _workoutCollection.InsertOneAsync(workout);
            return;
        }
        public async Task EditWorkoutAsync(string id, Workout workout)
        {
            FilterDefinition<Workout> filter = Builders<Workout>.Filter.Eq("id", id);
            await _workoutCollection.ReplaceOneAsync(filter, workout);
            return;
        }
        public async Task DeleteWorkoutAsync(string id)
        {
            // Delete all days and records from workout first or else they'll be left floating around
            // with no workout to reference
            FilterDefinition<Record> recordsFilter = Builders<Record>.Filter.Eq("workoutId", id);
            await _recordCollection.DeleteManyAsync(recordsFilter);
            FilterDefinition<Day> daysfilter = Builders<Day>.Filter.Eq("workoutId", id);
            await _dayCollection.DeleteManyAsync(daysfilter);
            FilterDefinition<Workout> filter = Builders<Workout>.Filter.Eq("id", id);
            await _workoutCollection.DeleteOneAsync(filter);
            return;
        }
        // ******************** ******** ******************** //

        // ******************** Days ******************** //
        public async Task<List<Day>> GetDayAsync() 
        {
            return await _dayCollection.Find(new BsonDocument()).ToListAsync();
        }
        public async Task<Day> GetDayByIdAsync(string id)
        {
            FilterDefinition<Day> filter = Builders<Day>.Filter.Eq("id", id);
            return await _dayCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<List<Day>> GetDaysByWorkoutIdAsync(string workoutId)
        {
            FilterDefinition<Day> filter = Builders<Day>.Filter.Eq("workoutId", workoutId);
            return await _dayCollection.Find(filter).ToListAsync();
        }
        public async Task CreateDayAsync(Day day)
        {
            await _dayCollection.InsertOneAsync(day);
            return;
        }
        public async Task EditDayAsync(string id, Day day)
        {
            FilterDefinition<Day> filter = Builders<Day>.Filter.Eq("id", id);
            await _dayCollection.ReplaceOneAsync(filter, day);
            return;
        }
        public async Task DeleteDayAsync(string id)
        {
            FilterDefinition<Record> recordsFilter = Builders<Record>.Filter.Eq("dayId", id);
            await _recordCollection.DeleteManyAsync(recordsFilter);
            FilterDefinition<Day> filter = Builders<Day>.Filter.Eq("id", id);
            await _dayCollection.DeleteOneAsync(filter);
            return;
        }
        // ******************** ******** ******************** //

        // ******************** Records ******************** //
        public async Task<List<Record>> GetRecordAsync()
        {
            return await _recordCollection.Find(new BsonDocument()).ToListAsync();
        }
        public async Task<Record> GetRecordByIdAsync(string id)
        {
            FilterDefinition<Record> filter = Builders<Record>.Filter.Eq("id", id);
            return await _recordCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<List<Record>> GetRecordsByDayIdAsync(string id)
        {
            FilterDefinition<Record> filter = Builders<Record>.Filter.Eq("dayId", id);
            return await _recordCollection.Find(filter).ToListAsync();
        }
        public async Task<List<Record>> GetRecordsByExerciseAsync(string exercise)
        {
            FilterDefinition<Record> filter = Builders<Record>.Filter.Eq("excerciseName", exercise);
            return await _recordCollection.Find(filter).ToListAsync();
        }
        public async Task<List<Record>> GetRecordsByWorkoutIdAsync(string id)
        {
            FilterDefinition<Record> filter = Builders<Record>.Filter.Eq("workoutId", id);
            return await _recordCollection.Find(filter).ToListAsync();
        }
        public async Task<List<Record>> GetRecordsByDateCompletedAsync(DateTime date)
        {
            FilterDefinition<Record> filter = Builders<Record>.Filter.Eq("dateCompleted", date);
            return await _recordCollection.Find(filter).ToListAsync();
        }
        public async Task CreateRecordAsync(Record record)
        {
            await _recordCollection.InsertOneAsync(record);
            return;
        }
        public async Task EditRecordAsync(string id, Record record)
        {
            FilterDefinition<Record> filter = Builders<Record>.Filter.Eq("id", id);
            await _recordCollection.ReplaceOneAsync(filter, record);
            return;
        }
        public async Task DeleteRecordAsync(string id)
        {
            FilterDefinition<Record> filter = Builders<Record>.Filter.Eq("id", id);
            await _recordCollection.DeleteOneAsync(filter);
            return;
        }
        // ******************** ******** ******************** //
    }
}
