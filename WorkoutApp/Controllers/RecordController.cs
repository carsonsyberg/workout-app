using System;
using Microsoft.AspNetCore.Mvc;
using WorkoutApp.Services;
using WorkoutApp.Models;
using Microsoft.AspNetCore.Authorization;
using WorkoutApp.Classes;

namespace WorkoutApp.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    //[Authorize]
    public class RecordController : Controller
    {
        private readonly MongoDBService _mongoDBService;

        public RecordController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet("[action]")]
        public async Task<List<Record>> GetRecords()
        {
            return await _mongoDBService.GetRecordAsync();
        }

        [HttpGet("[action]")]
        public async Task<List<string>> GetExercises()
        {
            List<Record> allRecords = await _mongoDBService.GetRecordAsync();

            return allRecords.Select(r => r.excerciseName).Distinct().ToList();
        }

        [HttpGet("[action]/{id}")]
        public async Task<Record> GetRecordById(string id)
        {
            return await _mongoDBService.GetRecordByIdAsync(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<Record>> GetRecordsByDayId(string id)
        {
            return await _mongoDBService.GetRecordsByDayIdAsync(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<Record>> GetRecordsByWorkoutId(string id)
        {
            return await _mongoDBService.GetRecordsByWorkoutIdAsync(id);
        }

        [HttpGet("[action]/{date}")]
        public async Task<List<Record>> GetRecordsByDateCompleted(string date)
        {
            var currentDate = DateTime.Parse(date);
            return await _mongoDBService.GetRecordsByDateCompletedAsync(currentDate);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateRecord([FromBody] Record record) 
        {
            await _mongoDBService.CreateRecordAsync(record);
            return CreatedAtAction(nameof(GetRecords), new { id = record.id }, record);
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> EditRecord(string id, [FromBody] Record record)
        {
            await _mongoDBService.EditRecordAsync(id, record);
            return NoContent();
        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteRecord(string id)
        {
            await _mongoDBService.DeleteRecordAsync(id);
            return NoContent();
        }
        
        // Get max weight by excercise
            // filter records by excercise name
            // find the max weight for each distinct date
            // get list of max weight / date pairs

        [HttpGet("[action]/{exercise}")]
        public async Task<List<DataPoint>> GetMaxWeightsByExercise(string exercise)
        {
            var records = await _mongoDBService.GetRecordsByExerciseAsync(exercise);
            var distinctDates = records.Select(r => r.dateCompleted).Distinct().ToList();

            var dataPoints = new List<DataPoint>();
            foreach (var date in distinctDates)
            {
                var maxWeight = records.Where(r => r.dateCompleted == date).Max(r => r.weight);
                dataPoints.Add(new DataPoint { Value = (int)maxWeight, Name = date });
            }

            return dataPoints;
        }

        [HttpGet("[action]/{exercise}")]
        public async Task<List<DataPoint>> GetTotalWeightsPerDayByExercise(string exercise)
        {
            var records = await _mongoDBService.GetRecordsByExerciseAsync(exercise);
            var distinctDates = records.Select(r => r.dateCompleted).Distinct().ToList();
            
            var dataPoints = new List<DataPoint>();
            foreach (var date in distinctDates)
            {
                var totalWeight = records.Where(r => r.dateCompleted == date).Sum(r => r.weight*r.numReps);
                dataPoints.Add(new DataPoint { Value = (int)totalWeight, Name = date });
            }

            return dataPoints;
        }

        [HttpGet("[action]")]
        public async Task<int> GetTotalWeightMoved()
        {
            var records = await _mongoDBService.GetRecordAsync();

            return records.Sum(r => r.numReps*r.weight) ?? 0;
        }

        [HttpGet("[action]")]
        public async Task<int> GetTotalRepsCompleted()
        {
            var records = await _mongoDBService.GetRecordAsync();

            return records.Sum(r => r.numReps) ?? 0;
        }
        
        // Get weight x # reps by workout
            // filter records by excercise name
            // sum up all the (numReps x weights) for each distinct date
            // get list of sums / date pairs
        
        // Get total # reps
            // sum up # reps for each distinct date
            // get list of sums / date pairs
            
        // Get total weight
            // sum up weight for each distinct date
            // get list of sums / date pairs
            
        // Get total weight x # reps
            // sum up numReps x weight for each date
            // get list of sum / date pairs
    }
}
