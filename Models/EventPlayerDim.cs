using System;
using System.Collections.Generic;

namespace LIVLens.Models
{
    public partial class EventPlayerDim
    {
        public EventPlayerDim()
        {
            EventPlayerScoreFacts = new HashSet<EventPlayerScoreFact>();
            SurveyFacts = new HashSet<SurveyFact>();
        }

        public int EventPlayerId { get; set; }
        public int EventId { get; set; }
        public int PlayerId { get; set; }
        public DateTime? TeeTime { get; set; }
        public int PlayedInd { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public virtual EventDim Event { get; set; } = null!;
        public virtual PlayerDim Player { get; set; } = null!;
        public virtual ICollection<EventPlayerScoreFact> EventPlayerScoreFacts { get; set; }
        public virtual ICollection<SurveyFact> SurveyFacts { get; set; }
    }
}
