using AssignmentApi.Models;

namespace AssignmentApi
{
    public class EmployeeDto
    {
        public int Id { get; init; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public List<ProjectViewModel> Projects { get; set; } = new List<ProjectViewModel>();
    }
}
