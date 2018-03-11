if (process.platform !== 'darwin') { // iTunes-Discord is not compatible with Windows and Linux cause it uses iTunes-bridge (AppleScript) to communicate with iTunes.
    console.log("You need macOS to run this application!");
    process.exit();
}

require('./interface');
require('./functions/rpc');
//require('./settings');


console.log('iTunes-Discord started! Wait 15 seconds for the first RPC request to be sent...');
