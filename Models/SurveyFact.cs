using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class SurveyFact
    {
        public int SurveyId { get; set; }
        public int EventPlayerId { get; set; }
        public int ProductTypeId { get; set; }
        public int BrandModelId { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual BrandModelDim BrandModel { get; set; } = null!;
        public virtual EventPlayerDim EventPlayer { get; set; } = null!;
        public virtual ProductTypeDim ProductType { get; set; } = null!;
    }
}
