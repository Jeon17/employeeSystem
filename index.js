const {prompt} = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    loadMainPrompts();
}
// Loading prompts in order to guide user through desired actions for CMS application
async function loadMainPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_ALL_EMPLOYEES"
                },
                {
                    name: "View Employees by Department",
                    value: "VIEW_EMPLOYEES_BY_DEPT"
                },
                {
                    name: "View Employees by Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPTS"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPT"
                },
                {
                    name: "View all Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ])
};
// Switch statement for sifting through specific CRUD operations
switch (choice) {
    case "VIEW_ALL_EMPLOYEES":
        return viewAllEmployees();
    case "VIEW_EMPLOYEES_BY_DEPT":
        return viewEmployeesByDept();
    case "VIEW_EMPLOYEES_BY_MANAGER":
        return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
        return addEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
        return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
        return updateEmployeeManager();
    case "VIEW_DEPTS":
        return viewDepts();
    case "ADD_DEPT":
        return addDept();
    case "VIEW_ROLES":
        return viewRoles();
    case "ADD_ROLE":
        return addRole();
    default:
        return quit();
};

// Async function for viewing employees
async function viewAllEmployees() {
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.log("All Employees:".white.bgBlue)
    console.table(employees);

    loadMainPrompts();
}


async function viewEmployeesByDept() {
    const departments = await db.findAllDepts();

    const deptChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see the employees in?",
            choices: deptChoices
        }
    ]);

    const employees = await db.findAllEmployeesByDept(departmentId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

//View employees by manager
async function viewEmployeesByManager() {
    const managers = await db.findAllEmployees();

    const managerChoices = managers.map(({ id, manager }) => ({
        name: manager,
        value: id
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which managers team would you like to see?",
            choices: managerChoices
        }
    ]);

    const employees = await db.findAllEmployeesByDept(managerId)

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

//Update employee role
async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ]);

    await db.updateEmployeeRole(employeeId, roleId);

    console.log("\n");
    console.log("Updated employee's role".white.bgBlue);
    console.log("\n");

    loadMainPrompts();
}

//Update an employees manager
async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's manager do you want to update?",
            choices: employeeChoices
        }
    ]);

    const possibleManager = await db.findAllEmployeesButSelected(employeeId);

    const possibleManagerChoices = possibleManager.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Who would you like to assign as the new manager?",
            choices: possibleManagerChoices
        }
    ]);

    await db.updateEmployeeManager(employeeId, managerId);

    console.log("\n");
    console.log("Updated employee's manager".white.bgBlue);
    console.log("\n");

    loadMainPrompts();
}

//Create removeRole function
async function removeRole() {
    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "What role would you like to remove?",
            choices: roleChoices
        }
    ]);

    await db.removeRole(roleId);

    console.log("\n");
    console.log(`Removed role from the database`.white.bgBlue);
    console.log("\n");

    loadMainPrompts();

}

//View departments
async function viewDepts() {
    const departments = await db.findAllDepts();

    console.log("\n");
    console.log("All Departments:".white.bgBlue)
    console.table(departments);

    loadMainPrompts();
}

//View Roles
async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.log("All Roles:".white.bgBlue)
    console.table(roles);

    loadMainPrompts();
}

//Create addDepartment function
async function addDept() {
    const dept = await prompt([
        {
            name: "name",
            message: "What is the name of the new department?"
        }
    ]);

    await db.createDept(dept);

    console.log(`Added new department (${dept.name}) to the database`.white.bgBlue);

    loadMainPrompts();
}

//Add role to the database
async function addRole() {
    const departments = await db.findAllDepts();

    const role = await prompt([
        {
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            name: "salary",
            message: "What is the salary for the new role?"
        }
    ]);

    const deptChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { deptId } = await prompt([
        {
            type: "list",
            name: "deptId",
            message: "What department would you like to add a role to?",
            choices: deptChoices
        }
    ]);

    role.department_id = deptId;

    await db.createRole(role);

    console.log("\n");
    console.log(`Added new role to the database!`.white.bgBlue);
    console.log("\n");

    loadMainPrompts();
}

//Add Employee
async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log("\n");
    console.log(`Added ${employee.first_name} ${employee.last_name} to the database`.white.bgBlue);
    console.log("\n");

    loadMainPrompts();
}

function quit() {
    console.log("\n");
    console.log("Goodbye!".white.bgBlue);
    process.exit();
}
