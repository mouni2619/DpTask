const employees = [];

// Add Employee Function
function addEmployee(id, name, department, managerId = null) {
    if (employees.some(emp => emp.id === id)) {
        console.log("Employee with this ID already exists.");
        return;
    }
    if (managerId && !employees.some(emp => emp.id === managerId)) {
        console.log("Manager with this ID does not exist.");
        return;
    }

    const newEmployee = { id, name, department, managerId };
    employees.push(newEmployee);
    console.log("Employee added:", newEmployee);
}

// Update Employee Function
function updateEmployee(id, updatedData) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
        console.log("Employee not found.");
        return;
    }
    if (updatedData.managerId && !employees.some(emp => emp.id === updatedData.managerId)) {
        console.log("Manager with this ID does not exist.");
        return;
    }

    Object.assign(employee, updatedData);
    console.log("Employee updated:", employee);
}

// Delete Employee Function
function deleteEmployee(id) {
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
        console.log("Employee not found.");
        return;
    }

    employees.splice(index, 1);
    console.log(`Employee with ID ${id} deleted.`);
}

// Search Employees Function
function searchEmployees(criteria) {
    const results = employees.filter(emp => {
        return Object.keys(criteria).every(key => emp[key] === criteria[key]);
    });

    console.log("Search results:", results);
    return results;
}

// Display Hierarchy Function
function displayHierarchy() {
    const hierarchy = buildHierarchy();
    console.log("Employee Hierarchy:");
    printHierarchy(hierarchy);
}

// Build Hierarchy Helper Function
function buildHierarchy(managerId = null) {
    return employees
        .filter(emp => emp.managerId === managerId)
        .map(emp => ({ ...emp, subordinates: buildHierarchy(emp.id) }));
}

// Print Hierarchy Helper Function
function printHierarchy(employees, level = 0) {
    employees.forEach(emp => {
        console.log(`${" ".repeat(level * 2)}- ${emp.name} (ID: ${emp.id}, Dept: ${emp.department})`);
        printHierarchy(emp.subordinates, level + 1);
    });
}

// Check Circular References Function
function checkCircularReferences() {
    const visited = new Set();

    function dfs(id) {
        if (visited.has(id)) {
            return true;
        }
        visited.add(id);
        const employee = employees.find(emp => emp.id === id);
        if (employee && employee.managerId !== null) {
            return dfs(employee.managerId);
        }
        visited.delete(id);
        return false;
    }

    for (const emp of employees) {
        visited.clear();
        if (dfs(emp.id)) {
            console.log(`Circular reference detected for employee ID ${emp.id}`);
            return true;
        }
    }
    return false;
}

// Terminal Interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

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
                deleteEmployee(parseInt(args[0]));
                break;
            case 'search':
                searchEmployees({ [args[0]]: args[1] });
                break;
            case 'hierarchy':
                displayHierarchy();
                break;
            case 'checkCircular':
                checkCircularReferences();
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
                    addEmployee(parseInt(id), name, department, managerId ? parseInt(managerId) : null);
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
                updateEmployee(id, { name, department, managerId: managerId ? parseInt(managerId) : null });
                prompt();
            });
        });
    });
}

prompt();
