using System;

namespace Common.Entities
{
    public class FacebookPageData
    {
        public long Id { get; set; }
        public decimal CountMembers { get; set; }
        public DateTime? DateUpdate { get; set; }
        public long IdPage { get; set; }
        public FacebookPage Page { get; set; }
    }
}