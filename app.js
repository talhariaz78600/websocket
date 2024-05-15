const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

const PORT = 8000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors:{
    origin:"*"
  }
});



app.use(express.json());
app.use(bodyParser.json());

// Routers
const adminRouter = require('./api/admin/admin');
const userRouter = require('./api/users/user');
const authRouter = require('./api/users/auth');
const foodRouter = require('./api/fooditem/fooditem');
const orderRouter = require('./api/foodorder/foodorder')(io); // Pass io instance here

// MongoDB connection
const uri = process.env.Mongoo_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Unable to connect to MongoDB', error);
  }
};

// Use Routers
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/food', foodRouter);
app.use('/api/order', orderRouter); // Use the order router here
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.json({ message: `Server is running at ${PORT}` });
});

// Connect to MongoDB and start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});

// Socket.io connection
io.on('connection', client => {
  console.log('Client connected');
  
  client.on('event', data => {
    console.log('Event received:', data);
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

