const Order = require("./order.model");

const createAOrder = async (req,res) => {
    try {
        const newOrder= new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder)
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).json({ message: "Failed to create order" });
    }
}

const getOrderByEmail = async (req,res) => {
    try {
        const {email}=req.params;
        const orders = await Order.find({email}).sort({createdAt:-1})
        if (!orders){
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(201).json(orders);
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).json({ message: "Failed to get the orders" });
    }
}

module.exports={
    createAOrder,
    getOrderByEmail
}