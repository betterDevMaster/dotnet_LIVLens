using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class ClubDim
    {
        public int ClubId { get; set; }
        public int? BrandId { get; set; }
        public string Manufacturer { get; set; } = null!;
        public string Model { get; set; } = null!;
    }
}
