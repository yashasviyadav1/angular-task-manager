// connect to mongo db
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://new-user-1:new-user-1@cluster0.emms1dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Connected to MongoDB');
}).catch((e)=>{
    console.log('Failed to connect to MongoDB' + e);
})

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {mongoose};