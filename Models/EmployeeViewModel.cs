﻿namespace AssignmentApi.Models
{
    public class EmployeeViewModel
    {
        public int Id { get; init; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
    }
}
