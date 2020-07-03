USE employee_systemDB;

INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Legal"), ("Production");

INSERT INTO role (department_id, title, salary)
VALUES ((SELECT id FROM department WHERE name = "Sales"), "International Sales", 80000);

INSERT INTO role (department_id, title, salary)
VALUES ((SELECT id FROM department WHERE name = "Finance"), "Auditor", 79000);

INSERT INTO role (department_id, title, salary)
VALUES ((SELECT id FROM department WHERE name = "Legal"), "Executive Counsel", 142000);

INSERT INTO role (department_id, title, salary)
VALUES ((SELECT id FROM department WHERE name = "Production"), "Assembly Lead",57000);

INSERT INTO role (department_id, title, salary)
VALUES ((SELECT id FROM department WHERE name = "Production"), "Inspector", 65000);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES ((SELECT id FROM role WHERE id = 5),"Bob", "Murphy", 1);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES ((SELECT id FROM role WHERE id = 2),"Julie", "Setzer", 1);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES ((SELECT id FROM role WHERE id = 1),"Chuck", "Stevens", 2);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES ((SELECT id FROM role WHERE id = 4),"Lacey", "Phillips", 2);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES ((SELECT id FROM role WHERE id = 3),"Manuel", "Tyson", 2);
