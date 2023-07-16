const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands=new Bands();
bands.addBand(new Band('Sacrificio'));
bands.addBand(new Band('Boanerges'));
bands.addBand(new Band('KIR'));
bands.addBand(new Band('Strike3'));
// Mensajes de sockets
io.on('connection', client=>{
    console.log('Server: cliente conectado');
    client.emit('active-bands',bands.getBands());
    client.on('disconnect',()=>{
        console.log('Server: F perro, te desconectaste');
    });
    client.on('mensaje',(payload)=>{
        console.log('Mensaje!',payload);
        io.emit('mensaje', {nombre:'server'});
    });
    client.on('nuevo-mensaje',(payload)=>{
        io.emit('nuevo-mensaje', payload);
    });
    client.on('vote-band',(payload)=>{
        bands.voteBand(payload);
        io.emit('active-bands',bands.getBands());
    });
    client.on('new-band',(payload)=>{
        bands.addBand(new Band(payload));
        io.emit('active-bands',bands.getBands());
    });
    client.on('delete-band',(payload)=>{
        bands.deleteBand(payload);
        io.emit('active-bands',bands.getBands());
    });
});