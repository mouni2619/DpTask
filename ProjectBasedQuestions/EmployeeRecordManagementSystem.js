class Employee {
    constructor(id, name, department, managerId = null) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.managerId = managerId;
    }
}

class EmployeeManager {
    constructor() {
        this.employees = [];
    }

    addEmployee(id, name, department, managerId = null) {
        if (this.employees.some(emp => emp.id === id)) {
            console.log("Employee with this ID already exists.");
            return;
        }
        if (managerId && !this.employees.some(emp => emp.id === managerId)) {
            console.log("Manager with this ID does not exist.");
            return;
        }

        const newEmployee = new Employee(id, name, department, managerId);
        this.employees.push(newEmployee);
        console.log("Employee added:", newEmployee);
    }

    updateEmployee(id, updatedData) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) {
            console.log("Employee not found.");
            return;
        }
        if (updatedData.managerId && !this.employees.some(emp => emp.id === updatedData.managerId)) {
            console.log("Manager with this ID does not exist.");
            return;
        }

        Object.assign(employee, updatedData);
        console.log("Employee updated:", employee);
    }

    deleteEmployee(id) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index === -1) {
            console.log("Employee not found.");
            return;
        }

        this.employees.splice(index, 1);
        console.log(`Employee with ID ${id} deleted.`);
    }

    searchEmployees(criteria) {
        const results = this.employees.filter(emp => {
            return Object.keys(criteria).every(key => emp[key] === criteria[key]);
        });

        console.log("Search results:", results);
        return results;
    }

    displayHierarchy() {
        const hierarchy = this.buildHierarchy();
        console.log("Employee Hierarchy:");
        this.printHierarchy(hierarchy);
    }

    buildHierarchy(managerId = null) {
        return this.employees
            .filter(emp => emp.managerId === managerId)
            .map(emp => ({ ...emp, subordinates: this.buildHierarchy(emp.id) }));
    }

    printHierarchy(employees, level = 0) {
        employees.forEach(emp => {
            console.log(`${" ".repeat(level * 2)}- ${emp.name} (ID: ${emp.id}, Dept: ${emp.department})`);
            this.printHierarchy(emp.subordinates, level + 1);
        });
    }

    checkCircularReferences() {
        const visited = new Set();

        const dfs = id => {
            if (visited.has(id)) {
                return true;
            }
            visited.add(id);
            const employee = this.employees.find(emp => emp.id === id);
            if (employee && employee.managerId !== null) {
                return dfs(employee.managerId);
            }
            visited.delete(id);
            return false;
        };

        for (const emp of this.employees) {
            visited.clear();
            if (dfs(emp.id)) {
                console.log(`Circular reference detected for employee ID ${emp.id}`);
                return true;
            }
        }
        console.log("No circular references detected.");
        return false;
    }
}

// Terminal Interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const manager = new EmployeeManager();

function prompt() {
    readline.question('Enter a command: ', command => {
        const [action, ...args] = command.split(' ');

        switch (action) {
            case 'add':
                promptAddEmployee();
                break;
            case 'update':
                promptUpdateEmployee(parseInt(args[0]));
                break;
            case 'delete':
                manager.deleteEmployee(parseInt(args[0]));
                break;
            case 'search':
                manager.searchEmployees({ [args[0]]: args[1] });
                break;
            case 'hierarchy':
                manager.displayHierarchy();
                break;
            case 'checkCircular':
                manager.checkCircularReferences();
                break;
            case 'exit':
                readline.close();
                return;
            default:
                console.log('Unknown command');
        }

        prompt();
    });
}

function promptAddEmployee() {
    readline.question('Enter ID: ', id => {
        readline.question('Enter Name: ', name => {
            readline.question('Enter Department: ', department => {
                readline.question('Enter Manager ID (or leave blank if none): ', managerId => {
                    manager.addEmployee(parseInt(id), name, department, managerId ? parseInt(managerId) : null);
                    prompt();
                });
            });
        });
    });
}

function promptUpdateEmployee(id) {
    readline.question('Enter new Name: ', name => {
        readline.question('Enter new Department: ', department => {
            readline.question('Enter new Manager ID (or leave blank if none): ', managerId => {
                manager.updateEmployee(id, { name, department, managerId: managerId ? parseInt(managerId) : null });
                prompt();
            });
        });
    });
}

prompt();
