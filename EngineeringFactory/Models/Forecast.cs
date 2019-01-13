using System.Collections.Generic;

namespace EngineeringFactory.Models
{
    public class Forecast
    {
        public int Id {get;set;}
        public int Demand { get; set; }
        public int ProductCode { get; set; }
        public int DateMonth { get; set; }
        public int DateYear { get; set; }
        public virtual Product Product {get; set;}
    }
}
