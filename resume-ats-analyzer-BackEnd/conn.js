const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://rahulmahto2486_db_user:AZ5hPJ1ZkhZXs1F7@cluster0.dkowy4c.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => {
    console.log("Database Connected Successfully!!");
})
.catch((err) => {
    console.error("Database Connection Failed:", err.message);
});

