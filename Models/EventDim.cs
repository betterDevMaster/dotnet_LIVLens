using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class EventDim
    {
        public EventDim()
        {
            EventHoleDims = new HashSet<EventHoleDim>();
            EventPlayerDims = new HashSet<EventPlayerDim>();
        }

        public int EventId { get; set; }
        public string EventName { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string CourseName { get; set; } = null!;
        public DateTime EventDate { get; set; }
        public int? CoursePar { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual ICollection<EventHoleDim> EventHoleDims { get; set; }
        public virtual ICollection<EventPlayerDim> EventPlayerDims { get; set; }
    }
}
