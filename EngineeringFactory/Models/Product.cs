using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EngineeringFactory.Models
{
    public class Product
    {
        [Key]
        public int Code {get;set;}
        public string Title {get; set;}
        public decimal Price {get; set;}
        public virtual IEnumerable<Forecast> Forecasts {get; set;}
        public virtual IEnumerable<Coefficient> Coefficients {get; set;}
    }
}