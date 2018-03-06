# iTunes Discord integration
An app for macOS to automatically set the activity on Discord to the currently played music on iTunes

Currently, this is only a CLI NodeJS script to set the RPC in Discord as it's not finished. There is still a lot of things to implement, such as interval for resetting the RPC when the song changes, a way to properly close the RPC connection and, of course, the interface. I think I will use NW.js instead of Electron cause Electron is big.

# How to run it ?
You need NodeJS 8.0.0+ and macOS 10.10+ to use it. Just install the dependancies and... run it!
    
       $ npm install
       $ npm start
       
       