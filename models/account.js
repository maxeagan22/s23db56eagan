// passport config
let Account = require('./models/account');

//Account authentication
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-localmongoose");
const accountSchema = new Schema({
 username: String,
 password: String
});
accountSchema.plugin(passportLocalMongoose);

//export the schema
module.exports = mongoose.model("Account", accountSchema);