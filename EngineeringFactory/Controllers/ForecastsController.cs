using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EngineeringFactory.Models;

namespace EngineeringFactory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForecastsController : ControllerBase
    {
        private readonly EngineeringFactoryContext _context;

        public ForecastsController(EngineeringFactoryContext context)
        {
            _context = context;
        }

        // GET: api/Forecasts
        [HttpGet]
        public IEnumerable<Forecast> GetForecasts()
        {
            return _context.Forecasts;
        }

        // GET: api/Forecasts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetForecast([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var forecast = await _context.Forecasts.FindAsync(id);

            if (forecast == null)
            {
                return NotFound();
            }

            return Ok(forecast);
        }

        // PUT: api/Forecasts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutForecast([FromRoute] int id, [FromBody] Forecast forecast)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != forecast.Id)
            {
                return BadRequest();
            }

            _context.Entry(forecast).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForecastExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Forecasts
        [HttpPost]
        public async Task<IActionResult> PostForecast([FromBody] Forecast forecast)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Forecasts.Add(forecast);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetForecast", new { id = forecast.Id }, forecast);
        }

        // DELETE: api/Forecasts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForecast([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var forecast = await _context.Forecasts.FindAsync(id);
            if (forecast == null)
            {
                return NotFound();
            }

            _context.Forecasts.Remove(forecast);
            await _context.SaveChangesAsync();

            return Ok(forecast);
        }

        private bool ForecastExists(int id)
        {
            return _context.Forecasts.Any(e => e.Id == id);
        }
    }
}