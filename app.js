 //jshint esversion: 8

 const express = require("express");
 const bodyParser = require("body-parser");
 const request = require("request");
 const mailchimp = require("@mailchimp/mailchimp_marketing");
 const {config }  = require('./config.js');

 const app = express();

 mailchimp.setConfig({
   apiKey: config.API_KEY,
   server: config.SERVER_NAME,

 });
 // this is important because the local files(css and images) won't be rendered if not for this
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req,res){
   res.sendFile(__dirname+"/signup.html");
 });

 app.post("/", function(req, res){
    var fiName = req.body.fname;
    var laName = req.body.lname;
    var emailt = req.body.email;
    console.log(fiName+laName+emailt);

    const listId = "bc24ed1221";
const subscribingUser = {
  firstName: fiName,
  lastName: laName,
  email: emailt
};

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });

  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      res.id
    }.`
  );
  if(res.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }

  console.log(res.statusCode);
}

run();

 });

// the port is set to process.env.PORT for heroku deployment and 3000 for local testing
 app.listen(process.env.PORT || 3000, function(){
   console.log("server is running");
 });
