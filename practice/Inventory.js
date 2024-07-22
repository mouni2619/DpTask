class InventoryItem {
    constructor(id, name, quantity, reorderPoint, supplier) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.reorderPoint = reorderPoint;
        this.supplier = supplier;
        this.transactionHistory = [];
    }

    addTransaction(transaction) {
        this.transactionHistory.push(transaction);
    }
}

class InventoryManagementSystem {
    constructor() {
        this.inventory = [];
        this.users = [
            { username: 'admin', password: 'admin', role: 'admin' }
        ];
        this.loggedInUser = null;
    }

    login(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        if (user) {
            this.loggedInUser = user;
            console.log(`Logged in as ${username}`);
        } else {
            console.log('Invalid credentials');
        }
    }

    addInventoryItem(id, name, quantity, reorderPoint, supplier) {
        if (!this.isAdmin()) return;
        if (this.inventory.some(item => item.id === id)) {
            console.log("Item with this ID already exists.");
            return;
        }
        const newItem = new InventoryItem(id, name, quantity, reorderPoint, supplier);
        this.inventory.push(newItem);
        console.log("Inventory item added:", newItem);
    }

    updateInventoryItem(id, updatedData) {
        if (!this.isAdmin()) return;
        const item = this.inventory.find(item => item.id === id);
        if (!item) {
            console.log("Item not found.");
            return;
        }
        Object.assign(item, updatedData);
        console.log("Inventory item updated:", item);
    }

    deleteInventoryItem(id) {
        if (!this.isAdmin()) return;
        const index = this.inventory.findIndex(item => item.id === id);
        if (index === -1) {
            console.log("Item not found.");
            return;
        }
        this.inventory.splice(index, 1);
        console.log(`Inventory item with ID ${id} deleted.`);
    }

    checkReorderPoints() {
        this.inventory.forEach(item => {
            if (item.quantity <= item.reorderPoint) {
                console.log(`Reorder alert for item ${item.name}: Current quantity is ${item.quantity}, reorder point is ${item.reorderPoint}`);
            }
        });
    }

    generateReport() {
        console.log("Inventory Report:");
        this.inventory.forEach(item => {
            console.log(`ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}, Reorder Point: ${item.reorderPoint}, Supplier: ${item.supplier}`);
        });
    }

    isAdmin() {
        if (this.loggedInUser && this.loggedInUser.role === 'admin') {
            return true;
        } else {
            console.log("Unauthorized access. Admin only.");
            return false;
        }
    }
}

// Terminal Interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const system = new InventoryManagementSystem();

function prompt() {
    readline.question('Enter a command: ', command => {
        const [action, ...args] = command.split(' ');

        switch (action) {
            case 'login':
                system.login(args[0], args[1]);
                break;
            case 'add':
                promptAddInventoryItem();
                break;
            case 'update':
                promptUpdateInventoryItem(parseInt(args[0]));
                break;
            case 'delete':
                system.deleteInventoryItem(parseInt(args[0]));
                break;
            case 'checkReorder':
                system.checkReorderPoints();
                break;
            case 'report':
                system.generateReport();
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

function promptAddInventoryItem() {
    readline.question('Enter ID: ', id => {
        readline.question('Enter Name: ', name => {
            readline.question('Enter Quantity: ', quantity => {
                readline.question('Enter Reorder Point: ', reorderPoint => {
                    readline.question('Enter Supplier: ', supplier => {
                        system.addInventoryItem(parseInt(id), name, parseInt(quantity), parseInt(reorderPoint), supplier);
                        prompt();
                    });
                });
            });
        });
    });
}

function promptUpdateInventoryItem(id) {
    readline.question('Enter new Name: ', name => {
        readline.question('Enter new Quantity: ', quantity => {
            readline.question('Enter new Reorder Point: ', reorderPoint => {
                readline.question('Enter new Supplier: ', supplier => {
                    system.updateInventoryItem(id, {
                        name,
                        quantity: parseInt(quantity),
                        reorderPoint: parseInt(reorderPoint),
                        supplier
                    });
                    prompt();
                });
            });
        });
    });
}

prompt();
