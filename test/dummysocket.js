/*
* This just opens up a server socket so that 
*/

require('net').createServer((socket) => {
    socket.on('data', (data) => {
        console.log(data);
    });
})
    .on('error', (err) => console.error(err))
    .on('connection', () => console.log('CONNECTED!'))
    .on('close', () => console.log('Bye Bye!'))
    .listen(1234, () => console.log('server bound'));