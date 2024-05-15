const express = require('express');
const router = express.Router();
const FoodOrder = require('../../models/foodOrder');

module.exports = (io) => {
  ///////////////////// /api/order/foodorder/////////////////////
  router.post('/foodorder', async (req, res) => {
    const { userId, productId, price, title } = req.body;
    try {
      const item = new FoodOrder({
        userId: userId,
        productId: productId,
        price: price,
        title: title
      });
      await item.save();
      res.status(200).json({ message: "Payment successfully", item });

      // Emit event for new order
      io.emit('newOrder', item);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  ///////////////////// /api/order/getallorder /////////////////////
  router.get('/getallorder', async (req, res) => {
    try {
      const data = await FoodOrder.find();
      if (!data) {
        res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      res.json({ message: "Internal server error" });
    }
  });

  ///////////////////// /api/order/getorder/:id /////////////////////
  router.get('/getorder/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const singledata = await FoodOrder.findById(id);
      if (!singledata) {
        res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ singledata });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  ///////////////////// /api/order/updatestatus/:id /////////////////////
  router.put('/updatestatus/:id', async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
      let item = await FoodOrder.findById(id);
      if (!item) {
        res.status(404).json({ message: "Item not found" });
      }
      item.status = status;
      await item.save();

      res.status(200).json({ message: "Status update successfully", item });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  });

  ///////////////////// /api/order/deleteOrder/:id /////////////////////
  router.delete('/deleteOrder/:id', async (req, res) => {
    try {
      const { id } = req.params;
      let item = await FoodOrder.findById(id);
      if (!item) {
        res.status(404).json({ message: "Item not found" });
      }
      item = await FoodOrder.findByIdAndDelete(id);
      res.status(200).json({ message: "Item deleted successfully", item });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  ////////////////////////// /api/order/getUserorders ////////////
  router.get('/getUserorders/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const items = await FoodOrder.find({ userId: userId });
      if (!items) {
        res.status(404).json({ message: "Orders not found" });
      }

      res.status(200).json({ message: "Orders get successfully", items });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
};
