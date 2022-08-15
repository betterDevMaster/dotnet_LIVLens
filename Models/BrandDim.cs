using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class BrandDim
    {
        public int BrandId { get; set; }
        public string Brand { get; set; } = null!;
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime? DeleteDate { get; set; }
    }
}
