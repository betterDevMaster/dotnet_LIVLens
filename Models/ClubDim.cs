using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class ClubDim
    {
        public ClubDim()
        {
            SurveyFacts = new HashSet<SurveyFact>();
        }

        public int ClubId { get; set; }
        public int? BrandId { get; set; }
        public string Manufacturer { get; set; } = null!;
        public string Model { get; set; } = null!;

        public virtual ICollection<SurveyFact> SurveyFacts { get; set; }
    }
}
