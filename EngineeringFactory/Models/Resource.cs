using System.Collections.Generic;

namespace EngineeringFactory.Models
{
    public class Resource
    {
        public int Id {get; set;}
        public string Name {get;set;}
        public decimal Price {get;set;}
        public virtual IEnumerable<Coefficient> Coefficients {get;set;}
    }
}