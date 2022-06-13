// Now that we have a server listening for requests, let's create a controller that will execute logic when certain requests come in.

// create an array that will keep track of all the messages. We'll also need a variable that will keep track of what ID to assign to new messages to keep them unique. Let's create an id variable that is equal to 0
let id = 0

let messages = []

// Now let's use module.exports to export an object. We'll put all our methods on this object. We are using module.exports so that we can import the controller into index.js to setup routes.

// Each method should be a function that has two parameters, one called req and one called res

module.exports = {

    createMessage: (req, res) => {
        const { text, time } = req.body
        messages.push({ id, text, time})
        id++
        res.status(200).send(messages)
    },

    readMessage: (req, res) => {
        res.status(200).send(messages)
    },

    updateMessage: (req, res) => {
        const { text } = req.body
        const updateId = req.params.id
        const index = messages.findIndex(message => message.id == updateId)
        let message = messages[index]

        messages[index] = {
            id: message.id,
            text: text || message.text,
            time: message.time
        }

        res.status(200).send(messages)
    },

    deleteMessage: (req, res) => {
        const deleteId = req.params.id
        const index = messages.findIndex(message => message.id == deleteId)
        messages.splice(index, 1)

        res.status(200).send(messages)
    }
}

// The create method should create a new message object using text and time from the request body and also the global id variable. It should then push this new messsage object into the messages array. After a new message object is created, id should be incremented by one so that the previous id won't be used on any other future messages. This will effectively keep the id unique for every message. We'll then want to send the updated messages array.

// The read method should return the entire messages array.

// The update method should update the text property of a message using the text value from the request body. It should also determine which message to update based on the value of id from the request url parameters. We can use .findIndex to get the index where the ids match. We'll want to use double equals == to find the id instead of triple equals === in this case because the id in the message objects are numbers, and the id from the req.params is a string. We can then get the object using the index and update the object. Then we can return the updated messages array.

// The delete method should delete a message using the value of id from the request url parameters. We can use .findIndex again with the id to get the index of the message object and then use .splice to remove it from the messages array. We'll then want to send the updated messages array.