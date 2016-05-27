const inquirer = require('inquirer');
const exec = require('child_process').exec;

module.exports = {
  command() {
    inquirer.prompt({
      name: 'command',
      message: 'Type command',
      default: 'help'
    }).then(answer => {
      if (answer.command === 'exit' || answer.command === 'quit') {
        console.log('Bye!');
        process.exit(0);
      }

      console.log(`$ conoha ${answer.command}`);
      exec(`conoha ${answer.command}`, (err, stdout, stderr) => {
        if (err !== null) {
          console.log(err);
        }
        console.log(stdout);
        console.log(stderr);
        this.command();
      });
    });
  }
}
