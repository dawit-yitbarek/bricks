import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import "dotenv/config"; // Automatically loads .env variables
import cors from 'cors';
import pkg from "pg";
import connectPgSimple from "connect-pg-simple";
const {Pool} = pkg;
const app = express();

const PGStore = connectPgSimple(session);

// database configuration
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
pool.connect();

app.use(
  session({
    store: new PGStore({
      pool: pool,                // Use the existing database connection
      tableName : 'session' 
    }),
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: false,           // Only save sessions when they have data
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 5000, // 30 days 
      // secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
      httpOnly: true                // Protect against client-side JavaScript access
    }
  })
);


app.use(cors({
  origin: 'http://localhost:5173', // React app's URL
  credentials: true // Allow cookies to be sent
}));
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Allow JSON parsing
app.use(passport.initialize());
app.use(passport.session());


app.get("/home", async(req,res)=>{
  if(req.user){
    res.json(req.user)
    console.log(req.user);
  }else{
    res.json({name: "Default", age: "50"})
    console.log("no user");
  }
})


app.post("/register", async (req, res) => {
    try {
        const {name, age} = req.body
        const correctNumber = parseInt(age) //change the datatype of age to integer that send from the frontend input
        const insertData = await pool.query("INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *", [name, correctNumber])
        console.log(name, correctNumber);
        const user = insertData.rows[0]
        req.login(user, (err) => { // Passport login
            if (err) { throw err; }
        res.json({success: true,
             name: user.name,
             age: user.age
             });
          });
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
})

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
});


passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    cb(null, user);
  } catch (err) {
    console.log(err);
    return cb(err);
  }
});



// Error-handling middleware 
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send('Something broke!'); // Send an error response to the client
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });