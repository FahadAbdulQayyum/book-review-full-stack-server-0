import mongoose from 'mongoose';

// let driverURL= `mongodb+srv://fahad:fahad@contactmanager.abu8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
let driverURL = `mongodb+srv://jasad080:jasad080@cluster0.vugxc7n.mongodb.net/?retryWrites=true&w=majority` //upStart

mongoose.connect(driverURL);

export {mongoose}