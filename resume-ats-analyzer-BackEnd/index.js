const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 3000;

require('./conn');



app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');

app.use('/api/user' , UserRoutes)
app.use('/api/resume' , ResumeRoutes)



// Deployment Code
app.use(express.static(path.join(__dirname , "build")));

// Handle React Routing
app.get("/" , (req , res) => {
    res.sendFile(path.join(__dirname , "build" , "index.html"));
})

app.listen(PORT , () => {
    console.log("BackEnd is Running on port" , PORT)
})