var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    create_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    text: String,
    create_by: String,
    create_at: {type: Date, default: Date.now}
});

// declare a model called User with has shcema userSchema
mongoose.model("User", userSchema);
// declear a model called Post with has shcema userSchema
mongoose.model("Post", postSchema);

