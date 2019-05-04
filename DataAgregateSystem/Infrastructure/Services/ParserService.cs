using Common.Interfaces;

namespace Infrastructure.Services
{
    public class ParserService : IParserService
    {
        private readonly AppContext _context;

        public ParserService(AppContext context)
        {
            _context = context;
        }

        public void GetDataFacebookPage()
        {
            
        }

        public void GetDataFacebookPage(long idPage)
        {
            
        }
    }
}