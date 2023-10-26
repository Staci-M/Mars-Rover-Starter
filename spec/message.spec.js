const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

   let testMessage;

    //Test 4

    it("throws error if a name is NOT passed into the constructor as the first parameter", function(){
        expect(function(){new Message();}).toThrow(new Error('You must pass in a name as the first parameter!'))
    });

    // Test 5

    it('contructor sets name', function(){
      testMessage = new Message('Test Message Name');
      expect(testMessage.name).toEqual('Test Message Name');      
    })

    //Test 6

    it("contains a commands array passed into the constructor as the 2nd argument", function () {
      let testCommands  = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE',1200)];
      testMessage = new Message('Test message Name', testCommands);
      expect(testMessage.commands).toEqual(testCommands);
    });
});
