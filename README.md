# CodeViewer

A simple app for viewing project files with syntax highlighting.
Can be used as a stand alone electron app or web app.

Use the config.json file to set the root of the folder tree you wish to read as well as your data folder.
Also js/routes/readTree.js will use readRoot1 or readRoot2.

To begin as a web app you will need to edit index.html and app.js.  
  `<script src="lib.js"></script>`  
  `<script src="app.js"></script>`  
for index.html and `Actions.apiInit('ws');` for app.js.  

To run; `npm install`, `gulp nw` and `npm start`. Then `localhost:3800` in the browser.

To begin as a desktop electron app you will need to edit index.html and app.js.  
  `<script>var ipc = require('electron').ipcRenderer; var clipboard = require('clipboard');</script>`  
  `<script src="app.js"></script>`  
for index.html and `Actions.apiInit('ipc');` for app.js.  

To run; `npm install`, `gulp nw` and `gulp run`.

Example at http://calitek.com.
