# Live Code Editor Project

### Summary
A collaborative code and text editor built using Angular 7, Socket.io,  Node.js Ace Editor & MongoDB.

The application allows multiple users to edit and modify a single document concurrently. A user on load up will be able to work either on the text editor or the code editor collaboratively. 

The text editor uses HTML5 `<textarea>` element on which changes are registered and sent to the server. The code editor makes use of Ace Editor’s `deltas` which is an implementation of a [CRDT]( https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) type to merge and resolve conflicts from multiple streams.

## How to Start

Start the server

```
Npm install –save express socke.io mongodb 
cd ~/socket-server
node app.js
```
Wait for it to print 
"Connected > socket"

Then in `socket-app` directory do:

```
npm build
ng serve --open
```
## Features
-	On text editor, multiple documents can be created with their state saved on the server
- Upon load, the code editor will retrieve a list of changes perform on it and attempts to restore
-	(Together.js)[ https://togetherjs.com/] library used to allow cross communication live chat & video call 
- *Commit Scroller* allows to scroll back changes using a *startTime* and *endTime*. Note: very experimental

## Screenshots

![homepage](/screenshots/Homepage.png?raw=true "Homepage")

![Code Editor](/screenshots/editor.png?raw=true "Code Editor")

![Text Editor](/screenshots/code-editor.png?raw=true "Text Editor")

![Time Machine](/screenshots/experimental.png?raw=true "Commit Scroller")


### Team Member
- Abdusamed Ahmed
- Shubham Thapa
- Akshay Shinde

### Dependencies
`npm i ace-builds —-save` if `ace editor` reference not found
