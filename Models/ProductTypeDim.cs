using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class ProductTypeDim
    {
        public ProductTypeDim()
        {
            SurveyFacts = new HashSet<SurveyFact>();
        }

        public int ProductTypeId { get; set; }
        public string ProductCategory { get; set; } = null!;
        public string? ProductSubCategory { get; set; }
        public string ProductType { get; set; } = null!;
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual ICollection<SurveyFact> SurveyFacts { get; set; }
    }
}
