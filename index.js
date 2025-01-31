require('dotenv').config();
const express=require('express');
const app=express();
const mongoose = require('mongoose');
const cors=require('cors');
const PORT=process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({
  origin:['http://localhost:5173','https://book-forge-f.vercel.app'],
  credentials:true
}))
const bookRoutes=require('./src/books/book.route.js');
const orderRoutes=require('./src/orders/order.route.js');
const userRoutes=require('./src/users/user.route.js');
const adminRoutes=require('./src/stats/admin.stats.js')
// routes
app.use('/api/books',bookRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/auth',userRoutes)
app.use('/api/admin',adminRoutes);

app.listen(PORT,()=>{
    console.log(`App is listening at port:${PORT}`);
})
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log(`Mongoose Server Connected Successfully At: ${process.env.DB_URL}`)
}