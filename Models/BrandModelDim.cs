using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class BrandModelDim
    {
        public int BrandModelId { get; set; }
        public string Brand { get; set; } = null!;
        public string Model { get; set; } = null!;
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
