import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

// ====== FIRST DB: USER DB ======
mongoose.connect('mongodb://localhost:27017/User')
  .then(() => console.log('User DB connected'))
  .catch(err => console.log('Error connecting to User DB:', err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const UserModel = mongoose.model('userdetails', UserSchema);

// Routes for User DB
app.get('/getuser', async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data);
  } catch (error) {
    console.log(error, 'error in getting user');
    res.status(500).send('Error getting user');
  }
});

app.post('/newuser', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await UserModel.findOne({ email });
    if (existinguser) return res.status(400).json({success: false, message: "Email already exists" });

    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = new UserModel({ name, email, password: hashpassword });
    await newuser.save();
    res.json({newuser,success:true});
  } catch (error) {
    console.log(error, 'error in creating user');
    res.status(500).send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "No such email...Sign up first" });

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false,message: "Invalid password" });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error, 'error in login');
    res.status(500).send('Login error');
  }
});

// ====== SECOND DB: COUNT DB ======
const countDB = mongoose.createConnection('mongodb+srv://akshi20jain03:niXKH4b2LEX0aYea@learnings.baxbn3r.mongodb.net/count_db');

countDB.on('connected', () => console.log('Count DB connected'));
countDB.on('error', (err) => console.log('Count DB connection error:', err));

const countSchema = new mongoose.Schema({
  count: Number
});
const CountModel = countDB.model('numbers', countSchema);

// Routes for Count DB
app.get('/getdata', async (req, res) => {
  try {
    const data = await CountModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.put('/add', async (req, res) => {
  try {
    const data = await CountModel.findOne();
    data.count += 1;
    await data.save();
    res.json({ count: data.count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to increment' });
  }
});

app.put('/sub', async (req, res) => {
  try {
    const data = await CountModel.findOne();
    data.count -= 1;
    await data.save();
    res.json({ count: data.count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to decrement' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
