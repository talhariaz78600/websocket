const express = require('express');
const router = express.Router();
const Food = require('../../models/foodItem')

///////////////////// /api/food/addfooditem /////////////////////
router.post('/addfooditem', async (req, res) => {
    const { title, Ingredients, Description, itemImageUrl, itemPrice } = req.body;
    try {
        const item = new Food({
            title: title,
            Ingredients: Ingredients,
            Description: Description,
            itemImageUrl: itemImageUrl,
            itemPrice: itemPrice,
        })
        await item.save();
        res.status(200).json({message:"Item add successfully",item})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
///////////////////// /api/food/getallitems /////////////////////
router.get('/getallitems',async (req,res)=>{
    try {
        const data= await Food.find();
        if(!data){
            res.status(404).json({message:"items not found"});
        }

        res.status(200).json({data});
    } catch (error) {
        res.json({message:"Internal server error"})
    }
})
///////////////////// /api/food/getsingleItem/:id /////////////////////
router.get('/getsingleItem/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const singledata= await Food.findById(id);
        if(!singledata){
            res.status(404).json({message:"item not found"})
        }
        res.status(200).json({singledata})
    } catch (error) {
        res.status(500).json({message:"Internal sever error"});
    }
})
///////////////////// /api/food/updateitem/:id /////////////////////
router.put('/updateitem/:id',async (req,res)=>{
    const { title, Ingredients, Description, itemImageUrl, itemPrice } = req.body;
    const { id }=req.params;
    try {
        let item= await Food.findById(id);
        if(!item){
            res.status(404).json({message:"item not found"})
        }
        if(title){
            item.title=title;
        }
        if(Ingredients){
            item.Ingredients=Ingredients;
        }
        if(Description){
            item.Description=Description;
        }
        if(itemPrice){
            item.itemPrice=itemPrice;
        }
        if(itemImageUrl){
            item.itemImageUrl=itemImageUrl;
        }
        await item.save();

        res.status(200).json({message:"item update successfully",item});
    } catch (error) {
        res.status(500).json({message:"Internal server error",error});
    }
})
///////////////////// /api/food/deleteitem/:id /////////////////////
router.delete('/deleteitem/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        let item= await Food.findById(id);
        if(!item){
            res.status(404).json({message:"item not found"})
        }
        item= await Food.findByIdAndDelete(id);
        res.status(200).json({message:"item deleted successfully",item})
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})

///////////////////// /api/food/searchitem/////////////////////
router.get('/searchitem', async (req, res) => {
    const { title } = req.query;
  
    try {
      const foods = await Food.find({ title: { $regex: new RegExp(title, 'i') } });
  
      if (foods.length > 0) {
        res.json(foods);
      } else {
        res.status(404).json({ message: 'No items found matching the search criteria' });
      }
    } catch (error) {
      console.error('Error searching for foods:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;