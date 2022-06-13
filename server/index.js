// require the package our server will need. Express is a minimalist web framework for Node that will allow us to spin up a server in no-time. We can create an express application by requiring it and saving express() to a variable

const port = 3000
const express = require('express')
// const cors = require('cors')
const app = express()

// Since we used module.exports in our server/controllers/messages_controller.js we can require it in our index.js. The entire index.js will have access to all the methods we put on the object ( create, read, update, and delete ).

const {createMessage, updateMessage, deleteMessage, readMessage} = require('./controllers/messages_controller.js')

// We also need to set up a body parser so that we have access to req.body in our endpoints. The express package we imported has a method on it called .json to do this. 
app.use(express.json())
// app.use(cors())

// Use express.static to serve the public/build folder setup the API to serve our front-end files
app.use(express.static(__dirname + '/../public/build'))


// We can then use the built-in methods express gives us to create endpoints. We'll use post for create; get for read; put for update; and delete for delete. We'll also make a messagesBaseUrl variable so that if the URL ever changes we won't have to update in four different places. The messagesBaseUrl should equal /api/messages
const msgBaseURL = '/api/messages'
app.post(msgBaseURL, createMessage)
app.put(msgBaseURL, updateMessage)
app.delete(msgBaseURL, deleteMessage)
app.get(msgBaseURL, readMessage)

// We now have a full express application stored in app. If you were to console log app you would see it's a large object with many methods we can make use of. One of them we'll use is called listen. This will allow us to say what port the server should listen on. Let's have our server listen on port 3001.
app.listen(port, () => console.log(`SERVER RUNNING ON ${port}`))

// Now when a get request is sent to http://localhost:3001/api/messages our read function will be executed in our messages_controller. Which will then send a response of the messages array. Here is a map of what happens when certain requests come through:

// http://localhost:3001/api/messages ( POST ) - create from messages_controller executes - responds with messages array.
// http://localhost:3001/api/messages ( GET ) - read from messages_controller executes - responds with messages array.
// http://localhost:3001/api/messages ( PUT ) - update from messages_controller executes - responds with messages array.
// http://localhost:3001/api/messages ( DELETE ) - delete from messages_controller executes - responds with messages array.