using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class EventHoleDim
    {
        public EventHoleDim()
        {
            EventPlayerScoreFacts = new HashSet<EventPlayerScoreFact>();
        }

        public int EventHoleId { get; set; }
        public int EventId { get; set; }
        public int HoleNum { get; set; }
        public int Par { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual EventDim Event { get; set; } = null!;
        public virtual ICollection<EventPlayerScoreFact> EventPlayerScoreFacts { get; set; }
    }
}
