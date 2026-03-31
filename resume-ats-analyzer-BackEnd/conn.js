const mongoose = require('mongoose');

mongoose.connect(
    'You Paste On DB API Key'
)
.then(() => {
    console.log("Database Connected Successfully!!");
})
.catch((err) => {
    console.error("Database Connection Failed:", err.message);
});

