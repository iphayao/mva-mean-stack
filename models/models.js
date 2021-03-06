var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    text: String,
    created_by: String,
    created_at: {type: Date, default: Date.now}
});

// declare a model called User with has shcema userSchema
mongoose.model("User", userSchema);
// declear a model called Post with has shcema userSchema
mongoose.model("Post", postSchema);

