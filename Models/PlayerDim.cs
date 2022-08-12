using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class PlayerDim
    {
        public PlayerDim()
        {
            EventPlayerDims = new HashSet<EventPlayerDim>();
        }

        public int PlayerId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Dob { get; set; }
        public string? Gender { get; set; }
        public string? CountryName { get; set; }
        public string? CountryCode { get; set; }
        public int? Amateur { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual ICollection<EventPlayerDim> EventPlayerDims { get; set; }
    }
}
