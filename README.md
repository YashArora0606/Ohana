# Ohana

### View it live at [itsohana.com](https://itsohana.com).


No programmer left behind! Simple real-time collaboration for whiteboarding and code editing in any language of your choice. Practice coding with friends with the visual aid of a whiteboard.

## About

Built with React on the frontend, Node.js + Express to manage rooms and client connections, and MongoDB to store whiteboard drawings. 

Leveraged Pusher.js and Firebase RTDB for real-time synchronization.

## Challenges
- We learned about Conflict-free replicated data types (CRDTs) and Operational Transform to achieve simultaneous text editing for multiple users

- We had to find a balance between the performance of real-time changes and the reliability of having them persisted to our database

- Integrating with DOM manipulation plugins in React

## Setup
First, clone the repo. Then install dependencies:
```
cd server
npm i 
cd ../client
npm i 
```
In development, create a file named ".env" in /client that defines the firebase configuration. They will be available upon creating a new firebase real-time-database. The following environment variables are needed in the .env file:

REACT_APP_apiKey="",
REACT_APP_authDomain="",
REACT_APP_databaseURL="",
REACT_APP_projectId="",
REACT_APP_storageBucket="",
REACT_APP_messagingSenderId="",
REACT_APP_appId=""

Similarly, a file named ".env" will also be needed in /server to define the mongoDB configuration. The environment variable is "MONGO_URI" 

To start the server for development on port 80, in /server:
```
node server.js
```
In a separate terminal, navigate to /client:
```
npm start
```
The react client will be on port 3000. 

The app is available on http://localhost:3000


## Things we've learned
- Intricacies of real-time synchronization and how to use web socket libraries

- Operational transform, and how it resolves concurrent edits to the same body of text
