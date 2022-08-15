using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class EventPlayerScoreFact
    {
        public int EventPlayerScoreId { get; set; }
        public int EventPlayerId { get; set; }
        public int EventHoleId { get; set; }
        public int Strokes { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual EventHoleDim EventHole { get; set; } = null!;
        public virtual EventPlayerDim EventPlayer { get; set; } = null!;
    }
}
