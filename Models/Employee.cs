using System.Text.Json.Serialization;

namespace AssignmentApi.Models
{
    public class Employee
    {
        public int Id { get; init; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public List<Project> Projects { get; set; } = new List<Project>();
    }
}
