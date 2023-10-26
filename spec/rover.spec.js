const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  let testRover = new Rover(31419);
  let testCommands = [];
  let testMessage = new Message('Test Message Name', testCommands);
  let testResponse = testRover.receiveMessage(testMessage);



  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function(){
    expect(testRover.position).toEqual(31419);
    expect(testRover.generatorWatts).toEqual(110);
    expect(testRover.mode).toEqual("NORMAL")
  });

  //Test 8

  it("response returned by receiveMessage contains the name of the message", function(){
    expect(testResponse.message).toEqual(testMessage.name);
  });

// Test 9

 it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
  testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
  testMessage.commands = testCommands;

  expect(new Rover().receiveMessage(testMessage).results.length).toEqual(2);
 });

//Test 10

it("responds correctly to the status check command", function (){
  testCommands = [new Command('STATUS_CHECK')];
  testMessage.commands = testCommands;
  testResponse = testRover.receiveMessage(testMessage);

  expect(testResponse.results[0].completed).toEqual(true);
  expect(testResponse.results[0].roverStatus).toEqual({
    mode: 'NORMAL',
    generatorWatts: 110,
    position: 31419
  });
});

// Test 11

it("responds correctly to the mode change command", function(){
  testCommands = [new Command('MODE_CHANGE','LOW_POWER')];
  testMessage.commands = testCommands;
  testResponse = testRover.receiveMessage(testMessage);

  expect(testResponse.results[0].completed).toEqual(true);
  expect(testRover.mode).toEqual('LOW_POWER');
});

//Test 12

it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
  testRover.mode = 'LOW_POWER';
  testCommands  = [new Command('MOVE', 12000)];
  testMessage = new Message('Test Message Name', testCommands);
  testResponse = testRover.receiveMessage(testMessage);

  expect(testResponse.results[0].completed).toEqual(false);
  expect(testRover.position).toEqual(31419);
});

//Test 13

it("responds with the position for the move command", function(){
  testRover.mode = 'NORMAL';
  testCommands = [new Command('MOVE', 1999)];
  testMessage = new Message('Test Message Name', testCommands);
  testResponse = testRover.receiveMessage(testMessage);

  expect(testResponse.results[0].completed).toEqual(true);
  expect(testRover.position).toEqual(1999);
});
});
