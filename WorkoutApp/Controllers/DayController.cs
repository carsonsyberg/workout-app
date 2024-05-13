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
    public class DayController : Controller
    {
        private readonly MongoDBService _mongoDBService;

        public DayController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet("[action]")]
        public async Task<List<Day>> GetDays()
        {
            return await _mongoDBService.GetDayAsync();
        }
        [HttpGet("[action]/{id}")]
        public async Task<Day> GetDayById(string id)
        {
            return await _mongoDBService.GetDayByIdAsync(id);
        }
        [HttpGet("[action]/{id}")]
        public async Task<List<Day>> GetDaysByWorkoutId(string idType, string id)
        {
            return await _mongoDBService.GetDaysByWorkoutIdAsync(id);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateDay([FromBody] Day day) 
        {
            await _mongoDBService.CreateDayAsync(day);
            return CreatedAtAction(nameof(GetDays), new { id = day.id }, day);
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> EditDay(string id, [FromBody] Day day)
        {
            Console.WriteLine(id, day);
            await _mongoDBService.EditDayAsync(id, day);
            return NoContent();
        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteDay(string id)
        {
            await _mongoDBService.DeleteDayAsync(id);
            return NoContent();
        }
    }
}
