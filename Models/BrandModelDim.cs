using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class BrandModelDim
    {
        public BrandModelDim()
        {
            SurveyFacts = new HashSet<SurveyFact>();
        }

        public int BrandModelId { get; set; }
        public int BrandId { get; set; }
        public string Brand { get; set; } = null!;
        public string Model { get; set; } = null!;
        public string? InternalAttrCategory { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime? DeleteDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual ICollection<SurveyFact> SurveyFacts { get; set; }
    }
}
