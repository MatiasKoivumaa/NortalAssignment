using AssignmentApi.Models;

namespace AssignmentApi.Dtos
{
    public class ProjectDto
    {
        public int Id { get; init; }
        public string ProjectName { get; set; } = string.Empty;
        public List<EmployeeViewModel> Employees { get; set; } = new List<EmployeeViewModel>();
    }
}
