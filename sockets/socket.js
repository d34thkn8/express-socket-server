const {io} = require('../index')
// Mensajes de sockets
io.on('connection', client=>{
    console.log('Server: cliente conectado');
    // client.on('disconnect',()=>{

    // })
    client.on('disconnect',()=>{
        console.log('Server: F perro, te desconectaste');
    });
    client.on('mensaje',(payload)=>{
        console.log('Mensaje!',payload);
        io.emit('mensaje', {nombre:'server'});
    })
});