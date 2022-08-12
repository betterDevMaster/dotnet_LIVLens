using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class BrandDim
    {
        public BrandDim()
        {
            SurveyFacts = new HashSet<SurveyFact>();
        }

        public int BrandId { get; set; }
        public string Brand { get; set; } = null!;
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual ICollection<SurveyFact> SurveyFacts { get; set; }
    }
}
