using AssignmentApi.Models;
using AssignmentApi.Dtos;

namespace AssignmentApi
{
    public static class Extensions
    {
        public static EmployeeDto EmployeeAsDto(this Employee employee)
        {
            return new EmployeeDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                JobTitle = employee.JobTitle,
                Projects = employee.Projects.Select(p => p.ProjectAsViewModel()).ToList()
            };
        }

        public static ProjectDto ProjectAsDto(this Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                ProjectName = project.ProjectName,
                Employees = project.Employees.Select(e => e.EmployeeAsViewModel()).ToList()
            };
        }

        public static ProjectViewModel ProjectAsViewModel(this Project project)
        {
            return new ProjectViewModel
            {
                Id = project.Id,
                ProjectName = project.ProjectName
            };
        }

        public static EmployeeViewModel EmployeeAsViewModel(this Employee employee)
        {
            return new EmployeeViewModel
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                JobTitle = employee.JobTitle
            };
        }
    }
}
