const express = require('express');
require('./config/db').connect();
const app = express();
app.use(express.json())
const PORT = 3000;
const api = require('./routes/router');
// const Admin = require('./models/admin').admin


app.use('/api', api)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});


// async function createAdmin() {
//     const admin = new Admin({
//         email: 'admin@mirafra.com',
//         password: '123456'
//     });

//    admin.save((err, res) => {
//         if (err) {
//             console.log('err',err)
//         }else{
//             console.log(res)
//         }
//     })
// }

// createAdmin().then((res) => {
//     console.log('res', res)
// }).catch((err) => {
//     console.log(err)
// })