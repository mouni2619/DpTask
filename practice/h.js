// Employee Record Management System
// Objective: Build an employee record management application.
// Requirements:
// - Create a system to manage employee records.
// - Allow adding, updating, and deleting employee records.
// - Implement search functionality based on different criteria (name, department, etc.).
// - Display reporting hierarchy of employees.
// - Handle edge cases such as circular references in the reporting structure.

class LocalStorageSimulator {
    constructor() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value;
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  
    clear() {
      this.store = {};
    }
  }
  
  const localStorage = new LocalStorageSimulator();
  
  class Employee {
    constructor(id, name, department, managerId = null) {
      this.id = id;
      this.name = name;
      this.department = department;
      this.managerId = managerId; // null if the employee doesn't have a manager
    }
  }
  class EmployeeManagementSystem {
    constructor() {
      this.employees = this.loadEmployees();
    }
  
    // Load employees from localStorage
    loadEmployees() {
      const employees = localStorage.getItem("employees");
      return employees ? JSON.parse(employees) : [];
    }
  
    // Save employees to localStorage
    saveEmployees() {
      localStorage.setItem("employees", JSON.stringify(this.employees));
    }
  
    // Add a new employee
    addEmployee(employee) {
      this.employees.push(employee);
      this.saveEmployees();
    }
  
    // Update an existing employee
    updateEmployee(updatedEmployee) {
      const index = this.employees.findIndex(
        (emp) => emp.id === updatedEmployee.id
      );
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
        this.saveEmployees();
      }
    }
  
    // Delete an employee
    deleteEmployee(employeeId) {
      this.employees = this.employees.filter((emp) => emp.id !== employeeId);
      this.saveEmployees();
    }
  
    // Search employees by different criteria
    searchEmployees(criteria) {
      return this.employees.filter((employee) => {
        return Object.keys(criteria).every((key) => {
          return employee[key]
            .toLowerCase()
            .includes(criteria[key].toLowerCase());
        });
      });
    }
  
    // Display reporting hierarchy of employees
    displayHierarchy() {
      const hierarchy = {};
      this.employees.forEach((employee) => {
        if (!employee.managerId) {
          hierarchy[employee.id] = { ...employee, subordinates: [] };
        }
      });
  
      this.employees.forEach((employee) => {
        if (employee.managerId && hierarchy[employee.managerId]) {
          hierarchy[employee.managerId].subordinates.push(employee);
        }
      });
  
      return hierarchy;
    }
  
    // Handle edge cases such as circular references
    hasCircularReference(employeeId, managerId) {
      if (!managerId) return false;
      let currentManagerId = managerId;
      while (currentManagerId) {
        if (currentManagerId === employeeId) {
          return true;
        }
        const manager = this.employees.find((emp) => emp.id === currentManagerId);
        currentManagerId = manager ? manager.managerId : null;
      }
      return false;
    }
  }
  const ems = new EmployeeManagementSystem();
  
  // Add employees
  ems.addEmployee(new Employee(1, "John Doe", "Engineering"));
  ems.addEmployee(new Employee(2, "Jane Smith", "Marketing", 1));
  ems.addEmployee(new Employee(3, "Alice Johnson", "Engineering", 1));
  ems.addEmployee(new Employee(4, "Bob Brown", "Sales", 2));
  
  // Update an employee
  ems.updateEmployee(new Employee(2, "Jane Smith", "Sales", 1));
  
  // Delete an employee
  ems.deleteEmployee(4);
  
  // Search employees
  console.log(ems.searchEmployees({ name: "Jane" }));
  console.log(ems.searchEmployees({ department: "Engineering" }));
  
  // Display hierarchy
  console.log(ems.displayHierarchy());
  
  // Check for circular reference
  console.log(ems.hasCircularReference(1, 3));
  console.log(ems.hasCircularReference(1, 1));add