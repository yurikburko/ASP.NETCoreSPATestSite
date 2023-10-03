using AutoMapper;
using SPATestSite.Models.DTO;

namespace SPATestSite.Models
{
    public class UsersMappingProfile : Profile
    {
        public UsersMappingProfile()
        {
            CreateMap<ApplicationUser, UserModel>();
        }
    }
}
