using System.Threading.Tasks;
using Common.Entities;

namespace Common.Interfaces
{
    public interface IParserService
    {
        Task GetTrafficData();
    }
}