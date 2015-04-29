//Queueing system in Javascript (for messaging, quite rudimentary. The server stores messages in array
//and returns them upon request with the option to delete within a certain amount of time.


function MessageHash(id, message) {
    this.messageId = id;
    this.message = message;
}

function Queue() {

    var queue = [];
    var currentHead = 0;
    var currentHashId=0;
    var waitTime = 1000;

    //removableHashIds contains an array of hashIds which have been read and can be removed if this.remove is called within waitTime
    var removableHashIds = [];

    this.add = function (itemToAdd) {
        var arrayObject = new MessageHash(currentHashId, itemToAdd);
        queue.push(arrayObject);
        currentHashId++;
        return currentHashId-1;
    }

    //this function removes the HashId from the array containing the Ids of the messages which have been viewed and can be removed
    //and is called waitTime milliseconds after View() is called
    function removeHashFromRemovable (id) {
        var indexOf =  removableHashIds.indexOf(id);
        if (indexOf!=-1) {
            removableHashIds.splice(indexOf, 1);
        }
    }

    this.view = function () {
        if (queue[currentHead]!=undefined) {
            currentHead++;
            var currentId = queue[currentHead-1].messageId;
            removableHashIds.push(currentId);
            setTimeout(function(){
                if (currentHead>0)currentHead--;
                removeHashFromRemovable(currentId)
            },  waitTime);
            return queue[currentHead-1];
        }
        else return undefined;

    }

    this.remove = function(messageId) {
        //check if the HashId passed in exists in the removableHashIds array
        if (removableHashIds.indexOf(messageId)!=-1){
            var indexOfMessageId = queue.map(function(e) { return e.messageId; }).indexOf(messageId);
            //remove from array the required message using array.splice()
            queue.splice(indexOfMessageId, 1);
            if (currentHead>0)currentHead--;
            return true;
        }
        else return false;
    }

}

// Test code. Should output the following
/*
 Hey there world. How are you?
 Hey there world. How are you?
 Hey world. How are you?
 Hey world. How you?
 */
var queue = new Queue();
queue.add('Hey');
queue.add('there');
queue.add('world.');
queue.add('How');
queue.add('are');
queue.add('you?');

printQueue();

setTimeout(function () {
    printQueue();
}, 200);

setTimeout(function () {
    printQueue(1);
}, 1500);

setTimeout(function () {
    printQueue(3);
}, 3000);

setTimeout(function () {
    printQueue();
}, 4500);


// Private function
function printQueue(index) {
    var i = 0;
    var messageHash = queue.view();
    var output = '';
    while (messageHash) {
        output += messageHash.message;
        output += ' ';
        if (i++ == index) queue.remove(messageHash.messageId);
        messageHash = queue.view();
    }
    if (output) console.log(output);
}





