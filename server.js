const app = require('./src/app');
require('dotenv').config();
const dbConnect = require('./src/db/database')
const PORT = 8080;
dbConnect(process.env.MONGO_URI)

app.listen(PORT,()=>console.log(`Your app is listening at PORT ${PORT}`)); 