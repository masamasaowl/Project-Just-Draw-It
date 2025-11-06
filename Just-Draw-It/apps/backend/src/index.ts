if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
// parse into json
app.use(express.json());

const PORT: number = 5000;
app.listen(PORT, () => {
    console.log("App is listening on port: 5000");
});

// jwt secret
const JWT_SECRET = process.env.JWT_SECRET || "fallback";

// demo database 
const users: any[] = [];


// Signup
app.post("/api/signup", async (req, res) => {
    const {username, email, password} = req.body;

    // check existing user
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = {
        id: users.length + 1,
        email,
        username,
        password: hashedPassword
    };
    users.push(newUser);

    res.json({message: "user registered successfully"});
});

// Signin user 
app.post("/api/signin", async (req,res) => {
    const { email, password } = req.body;

  // Check if valid user
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'User does not exist' });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
   
  // Create JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, message: 'Login successful' });
});



// ============== Let user create a room ============
app.post("/api/room",)
