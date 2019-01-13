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
    public class CoefficientsController : ControllerBase
    {
        private readonly EngineeringFactoryContext _context;

        public CoefficientsController(EngineeringFactoryContext context)
        {
            _context = context;
        }

        // GET: api/Coefficients
        [HttpGet]
        public IEnumerable<Coefficient> GetCoefficients()
        {
            return _context.Coefficients;
        }

        // GET: api/Coefficients/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCoefficient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coefficient = await _context.Coefficients.FindAsync(id);

            if (coefficient == null)
            {
                return NotFound();
            }

            return Ok(coefficient);
        }

        // PUT: api/Coefficients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoefficient([FromRoute] int id, [FromBody] Coefficient coefficient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != coefficient.Id)
            {
                return BadRequest();
            }

            _context.Entry(coefficient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoefficientExists(id))
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

        // POST: api/Coefficients
        [HttpPost]
        public async Task<IActionResult> PostCoefficient([FromBody] Coefficient coefficient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Coefficients.Add(coefficient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoefficient", new { id = coefficient.Id }, coefficient);
        }

        // DELETE: api/Coefficients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoefficient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coefficient = await _context.Coefficients.FindAsync(id);
            if (coefficient == null)
            {
                return NotFound();
            }

            _context.Coefficients.Remove(coefficient);
            await _context.SaveChangesAsync();

            return Ok(coefficient);
        }

        private bool CoefficientExists(int id)
        {
            return _context.Coefficients.Any(e => e.Id == id);
        }
    }
}