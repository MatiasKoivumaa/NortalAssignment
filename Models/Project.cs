using System.Text.Json.Serialization;

namespace AssignmentApi.Models
{
    public class Project
    {
        public int Id { get; init; }
        public string ProjectName { get; set; } = string.Empty;
        public List<Employee> Employees { get; set; } = new List<Employee>();
    }
}
