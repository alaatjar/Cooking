const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // contact us
const nodemailer = require("nodemailer");  // contact us
const Recipe = require("./modules/articleSchema");
const Reviews = require("./modules/articleSchema");

//for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//


// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/about.html", (req, res) => {
  res.render("about");
});

app.get("/OurAchievements.html", (req, res) => {
  res.render("OurAchievements");
});

app.get("/index.html", (req, res) => {
  res.render("index");
});

app.get("/register.html", (req, res) => {
  res.render("register");
});

app.get("/AddRecipe.html", (req, res) => {
  res.render("AddNewRecipe");
});

app.get("/Calculator.html", (req, res) => {
  res.render("Calculator");
});

app.get("/contactUs.html", (req, res) => {
  res.render("contactUs");
});

//contact us

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/views/contactUs.html')
});

app.post('/',(req,res) =>{
  console.log(req.body)

//   const transporter = nodemailer.createTransport({
//     service:'gmail',
// auth: {
//   user: 'Your Email',
//   pass: 'Pass'
//      }
//   })

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  service: 'outlook',
  port: 587,
auth: {
user: 'Your Email',
pass: 'Pass',
   },
    tls: {
        ciphers: 'SSLv3'
    }
})

const mailOptions = {
  from: req.body.email,
  to: 'Your Email',
  subject: `Message from ${req.body.email}: ${req.body.subject}`,
  text: req.body.message
}
transporter.sendMail(mailOptions,(error,info)=> {
  if(error){
    console.log(error);
    res.send('error');
  }else{
    console.log('Email sent:' + info.response);
    res.send('success')
  }
})
});
////////////////////////


// AddNewRecipe
app.get("/All-Recipe", (req, res) => {
  Recipe.find()
    .then((result) => {
      res.render("All-Recipe", {  arrArticle : result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/AddNewRecipe", (req, res) => {
  res.render("AddNewRecipe");
});

app.post("/All-Recipe", (req, res) => {
  const recipe = new Recipe(req.body);

  recipe
    .save()
    .then((result) => {
      res.redirect("/All-Recipe");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/All-Recipe/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((result) => {
      res.render("RecipeDetails", { objArticle : result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//////

app.get("/index", (req, res) => {
  Reviews.find()
    .then((result) => {
      res.render("index", { arrReviews : result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.post("/index", (req, res) => {
  const reviews = new Reviews(req.body);

  reviews
    .save()
    .then((result) => {
      res.redirect("/index");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index/:id", (req, res) => {
  Reviews.findById(req.params.id)
    .then((result) => {
      res.render("home", { objReviews: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

///////


app.get("/test.html", (req, res) => {
  res.render("test");
});

//404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

//mongoose
const mongoose = require("mongoose");
const { callbackify } = require("util");
const { send } = require("process");

mongoose
  .connect(
    "mongodb+srv://Alaa:Aa123456789@cluster0.cecj3.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

