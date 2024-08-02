const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

 //TEST #7 Testing if the constructor sets position of default values.
 test ("constructor sets postion and defualt values for mode and generatorWatts.", function() {
  let rover = new Rover(98382);
  expect(rover.position).toEqual(98382);
  expect(rover.mode).toEqual('NORMAL');
  expect(rover.generatorWatts).toEqual(110);
 
});

//TEST #8 Response returned by recieveMessage, that contains name.
test("response returned by receiveMessage contains the name of the message", function() {
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  expect(response.message).toEqual('Test message');
});
//TEST #9 
test("response returned by receiveMessage includes two results if two commands are sent", function() {
  let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 12000)];
  let message = new Message('Test message', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  expect(response.results.length).toEqual(2);
});
//TEST #10
test("responds correctly to the status check command", function()  {
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  expect(response.results[0].roverStatus).toEqual({ mode: 'NORMAL', generatorWatts: 110, position: 98382 });
});
//TEST #11
test("responds correctly to the mode change command", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Test message', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(rover.mode).toEqual('LOW_POWER');
});
//TEST #12
test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
  let message = new Message('Test message', commands);
  let rover = new Rover(98382);
  rover.receiveMessage(new Message('Test message', [new Command('MODE_CHANGE', 'LOW_POWER')]));
  let response = rover.receiveMessage(message);
  expect(response.results[1].completed).toBe(false);
  expect(rover.position).toEqual(98382);
});
//TEST #13
test("responds with the position for the move command", function() {
  let commands = [new Command('MOVE', 12000)];
  let message = new Message('Test message', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(rover.position).toEqual(12000);
});

});
