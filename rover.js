class Rover {
   constructor (position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;

   }
   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      };

      for (let command of message.commands) {
         if (command.commandType === 'STATUS_CHECK'){
            response.results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            response.results.push({ completed: true });
          } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
              response.results.push({ completed: false });
            } else {
              this.position = command.value;
              response.results.push({ completed: true });
            }
          }
        }
    
        return response;

   }

}



module.exports = Rover;