const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const render = require("./lib/htmlRenderer");

const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const team = [];

function gatherUserInputs() {

    inquirer.prompt([
        {
            type: "input",
            message: "What is the team member's name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is the team member's Id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the team member's email address?",
            name: "email"
        },
        {
            type: "list",
            message: "What is the team member's role?",
            name: "role",
            choices: ["Engineer", "Intern", "Manager"]
        }

    ]).then(function ({ name, id, email, role }) {
        switch (role) {
            case "Engineer":
                inquirer.prompt({
                    type: "input",
                    message: "What is the Engineer's Github username?",
                    name: "github"
                }).then(function (github) {
                    const engineer = new Engineer(name, id, email, github);
                    // createEngineer(name, id, email, github);
                    team.push(engineer);
                    addAnotherTeamMember();
                    }
                )
                break;
            case "Intern":
                inquirer.prompt({
                    type: "input",
                    message: "What school did the Intern attend?",
                    name: "school"
                }).then(function({school}){
                    // createIntern(name, id, email, school);
                    const intern = new Intern(name, id, email, school);
                    team.push(intern);
                    console.log(name + " " + id + " " + email + " " + school);
                    addAnotherTeamMember();
                    }
                )
                break;
            case "Manager":
                inquirer.prompt({
                    type: "input",
                    message: "What is the Manager's office number?",
                    name: "officeNumber"
                }).then(function ({ officeNumber }) {
                    console.log(name + " " + id + " " + email + " " + officeNumber);
                    // createManager(name, id, email, officeNumber);
                    const manager = new Manager(name, id, email, officeNumber);
                    team.push(manager);

                   
                    addAnotherTeamMember();
                    }
                )
                break;
        }

    })

}


function addAnotherTeamMember(){
    inquirer.prompt({
         type: "confirm",
         message: "Do you wish to add another team member?",
         name: "addAnotherTeamMember"
    }).then(function({addAnotherTeamMember}){
        console.log("Test1", team);
        if(addAnotherTeamMember) {
            console.log("Test2", team);
            gatherUserInputs();
        } else {
            printHTML();
            console.log("Test3", team);
        }
    }).catch(error => {
        console.log("There was a problem adding another team member", error);
    })
}

function printHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
  }


gatherUserInputs();