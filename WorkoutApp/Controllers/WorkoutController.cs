using System;
using Microsoft.AspNetCore.Mvc;
using WorkoutApp.Services;
using WorkoutApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace WorkoutApp.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    //[Authorize]
    public class WorkoutController : Controller
    {
        private readonly MongoDBService _mongoDBService;

        public WorkoutController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet("[action]")]
        public async Task<List<Workout>> GetWorkouts()
        {
            return await _mongoDBService.GetWorkoutAsync();
        }

        [HttpGet("[action]/{id}")]
        public async Task<Workout> GetWorkoutById(string id)
        {
            return await _mongoDBService.GetWorkoutByIdAsync(id);
        }

        [HttpGet("[action]")]
        public async Task<Workout> GetFavoriteWorkout()
        {
            return await _mongoDBService.GetFavoriteWorkoutAsync();
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> CreateWorkout([FromBody] Workout workout) 
        {
            await _mongoDBService.CreateWorkoutAsync(workout);
            return CreatedAtAction(nameof(GetWorkouts), new { id = workout.id }, workout);
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> EditWorkout(string id, [FromBody] Workout workout)
        {
            await _mongoDBService.EditWorkoutAsync(id, workout);
            return NoContent();
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> SetFavoriteWorkout([FromBody] Workout workout)
        {
            // search workout list for favorited workout
            // set old favorite to unfavorited and edit it
            List<Workout> workouts = await _mongoDBService.GetWorkoutAsync();
            foreach(Workout w in workouts)
            {
                if (w.isFavorite)
                {
                    w.isFavorite = false;
                    if(w.id != null)
                        await _mongoDBService.EditWorkoutAsync(w.id, w);
                }
            }

            // set new workout to favorite and edit it
            workout.isFavorite = true;
            if (workout.id != null)
                await _mongoDBService.EditWorkoutAsync(workout.id, workout);
            else
                return Ok(false);

            //await _mongoDBService.EditWorkoutAsync(id, workout);
            Console.WriteLine("FAVORITE IS NOW: " + workout.name);
            return Ok(true);
        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteWorkout(string id)
        {
            await _mongoDBService.DeleteWorkoutAsync(id);
            return NoContent();
        }
    }
}
