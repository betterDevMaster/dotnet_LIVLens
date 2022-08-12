using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class ClubDimRaw
    {
        public int ClubId { get; set; }
        public string Manufacturer { get; set; } = null!;
        public string Model { get; set; } = null!;
        public long? Loft { get; set; }
        public string? ClubNum { get; set; }
        public string? GolfRules { get; set; }
        public string? GrooveRules { get; set; }
    }
}
