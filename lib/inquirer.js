const inquirer = require('inquirer');

module.exports = {
  command() {
    inquirer.prompt({
      name: 'command',
      message: 'Type command',
      default: 'help'
    }).then(answer => {
      console.log(answer);
      if (answer.command === 'exit' || answer.command === 'quit') {
        console.log('Bye!');
        process.exit(0);
      }
      this.command();
    });
  }
}
