using System;

namespace Common.Entities
{
    public class TrafficData
    {
        public long Id { get; set; }
        public ushort Value { get; set; }
        public DateTime DateCreate { get; set; }

        public DateTime Time => new DateTime(01,01, 01, DateCreate.Hour, DateCreate.Minute, 0);
    }
}