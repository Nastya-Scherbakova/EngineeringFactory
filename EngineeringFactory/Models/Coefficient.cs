namespace EngineeringFactory.Models
{
    public class Coefficient
    {
        public int Id {get;set;}
        public int Amount {get; set;}
        public int ProductCode {get; set;}
        public int ResourceId {get; set;}
        public virtual Product Product {get; set;}
        public virtual Resource Resource {get; set;}
    }
}