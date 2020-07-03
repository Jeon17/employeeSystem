const connection = require("./connection");

class DB {
    // Maintain connection
    constructor(connection) {
        this.connection = connection;
    }

    // Find employees
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // Create an employee
    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    // Update the given employee role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    // Find all employees except the given employee id
    findAllEmployeesButSelected(employeeId) {
        return this.connection.query(
            "SELECT * FROM employee where id != ?",
            employeeId
        );
    }

    // Update the given employee's manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }

    // Find all roles
    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id"
        );
    }

    // Create a new role
    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }

    // Find all departments
    findAllDepts() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name"
        );
    }

    // Create a new department
    createDept(dept) {
        return this.connection.query("INSERT INTO department SET ?", dept);
    }

    // Find all employees in a given department
    findAllEmployeesByDept(departmentID) {
        return this.connection.query(
            "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, role.title, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id WHERE role.department_id = ?",
            departmentID
        );
    }

    // Find all employees by manager
    findAllEmployeesByDept(managerId) {
        return this.connection.query(
            "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, department.name, role.title, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE employee.manager_id = ?",
            managerId
        );
    }
}

//Exporting the DB
module.exports = new DB(connection);