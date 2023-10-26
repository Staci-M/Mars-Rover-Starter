const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!

   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }

   receiveMessage(message){
      let commands = message.commands;
      let results = [];

         for(let i = 0; i < message.commands.length; i++){
            let command = message.commands[i];
            let result = {completed: false};

            if(command.commandType === "MOVE"){
               if(this.mode === "NORMAL") {
                  this.position = command.value;
                  result.completed = true;
               }
            }else if(command.commandType ==="STATUS_CHECK"){
               result.completed = true;
               result.roverStatus = {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               };
            }else if(command.commandType === "MODE_CHANGE"){
               this.mode = command.value;
               result.completed = true;
            }
            results.push(result);
         }
      return{
         message: message.name,
         results: results
      };
   }

}

module.exports = Rover;