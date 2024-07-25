const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    //TEST #4 Checking if a name is passed into the constructor.

    test ("throws error if a name is NOT passed into the constructor as the first parameter", function(){
        expect( function() { new Message();}).toThrow(new Error('Name required.'));


    });

    //TEST #5 Checking if name is set.
    test("constructor sets name.", function(){
        const name = 'testName';
        const message = new Message(name);
        expect(message.name).toBe(name);

    });

    //TEST #6 Uses commands argument to pass into initilized object of Message class. Passes to constuctor.

    test("contains a commands array passed into the constructor as the 2nd argument.", function (){
        const name = 'testName';
        const commands = ["test1", "test2", "test3"];

        const message = new Message(name, commands);
        expect(message.commands).toBe(commands);
    });



});
