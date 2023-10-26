class Message {
   // Write code here!
   constructor(name, commands){
      if(!name){
        throw new Error('You must pass in a name as the first parameter!');
      }
      this.name = name;
      this.commands = commands;
    }
}

module.exports = Message;