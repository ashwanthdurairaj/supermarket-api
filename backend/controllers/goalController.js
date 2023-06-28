const asyncHandler = require('express-async-handler');
const { findByIdAndDelete } = require('../model/goalModel');
const Goal  = require('../model/goalModel'); //to work with data in database
const User = require('../model/userModel');
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user : req.user[0].id}) //if we dont put anything in the find(), then we will get all goals, for user specific goals include user.     
    res.status(200).json(goals);

})

const postGoals = asyncHandler(async (req, res) => {
    const {item_name, minimum_quantity, price, quantity_left, item_type, brand_name} = req.body
    if(!item_name || !minimum_quantity || !price || !quantity_left || !item_type || !brand_name)
    {
        res.status(400);
        throw new Error('Please add all required fields');
    }
    const goal = await Goal.create(
        {
            user: req.user[0].id,
            item_name: req.body.item_name,
            minimum_quantity: req.body.minimum_quantity,
            price: req.body.price,
            quantity_left: req.body.quantity_left,
            item_type: req.body.item_type,
            brand_name: req.body.brand_name
        }
    )
    if(!goal)
    {
        throw new Error('Please Fill correctly')
    }
    res.status(200).json(goal);

})

const putGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.find({_id: req.params.id})
    console.log('Updating')
    console.log(goal)
    console.log('ok')
    console.log(goal[0].user)
    if(!goal)
     {
        console.log('Item not found')
         res.status(400);
         throw new Error('Item not found');
     }
     const user = req.user[0];
     if(!user){
         res.status(401);
         throw new Error( 
             'User not found'
         )
     }

     //Make sure the logged in user matches the goal user
       if(goal[0].user.toString() != user.id){
       throw new Error('User not authorized')
    }
    
    // // if(req.body.quantity_left)
    // // {
    // //     await Item.findByIdAndUpdate(req.body.id, {$set:{quantity_left:item[0].quantity_left + parseInt(req.body.quantity_left)}}, {new: true});
    // // }
    // console.log(goal)

    if(req.body.minimum_quantity)
    {
        await Goal.findByIdAndUpdate(req.params.id, {$set:{minimum_quantity:parseInt(req.body.minimum_quantity)}}, {new:true})
    }

    if(req.body.price)
    {
        await Goal.findByIdAndUpdate(req.params.id, {$set:{price:parseInt(req.body.price)}}, {new:true});
    }

    if(req.body.quantity_left)
    {
        await Goal.findByIdAndUpdate(req.params.id, {$set:{quantity_left: goal[0].quantity_left + parseInt(req.body.quantity_left)}}, {new:true});
    }
})

const deleteGoals = asyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);
    console.log('delete');
    console.log(goal)
    if(!goal)
    {
        res.status(400);
        throw new Error('Goal not found');
    }
    const user = req.user[0];
    console.log(user);
    if(!user){
        res.status(401);
        throw new Error(
            'User not found'
        )
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() != user.id){
        throw new Error('User not authorized')
    }
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({id : req.params.id}); 

})

const billing = asyncHandler(async (req, res) => {
    
    if(!req.body.quantity_left || !req.body.brand_name || !req.body.quantity_left || !req.body.item_type)
    {
        res.status(400);
        throw new Error('Please add all required fields');
    }
    console.log(req.body);
    const brand = req.body.brand_name
    const item = req.body.item_name
    const quantity = req.body.quantity_left
    const type = req.body.item_type
    const user = req.user[0];
    const item_brand = await Goal.find({user:user._id,item_name: item, brand_name: brand});
    console.log(item_brand)
    const price = item_brand[0].price
    if(!item_brand)
    {
        res.status(400);
        throw new Error('Item not found')
    }

    console.log(user)
    if(!req.user[0])
    {
        res.status(400);
        throw new Error('User not authorized')
    }
    if(item_brand[0].user.toString() != user.id) //user id of ITEM and id of USER must match
    {       
        throw new Error('User not authorized, cannot be deleted');
    }
    // //subtract quantity from stock
    // //add if statements
    
    //decrease quantity
    console.log('brooo')
    const up = await Goal.findByIdAndUpdate(item_brand[0].id, {$set:{quantity_left:item_brand[0].quantity_left-parseInt(req.body.quantity_left)}}, {new: true});
    const u = await Goal.findByIdAndUpdate(req.user[0].id, {$set: {balance: req.user[0].balance + (item_brand[0].price * req.body.quantity_left)}}, {new:true})
    let total = parseInt(item_brand[0].price * req.body.quantity_left)
    const sales = await Goal.findByIdAndUpdate(item_brand[0].id, {$set: {sales: item_brand[0].sales + parseInt(item_brand[0].price * req.body.quantity_left)}}, {new:true})
    const sold = await Goal.findByIdAndUpdate(item_brand[0].id, {$set: {quantity_sold: item_brand[0].quantity_sold + parseInt(req.body.quantity_left)}}, {new:true})
    
    res.status(200).json({item, brand, quantity, type, total, price});
    //update balance in the user_account
        // res.json(u);
    // //add sales
    

})

const sortQuantity = asyncHandler(async (req, res) => {
    
    let goal = await Goal.find({user: req.body.id})
    goal = goal.sort((a, b) => {
        if(a.quantity_sold > b.quantity_sold)
        {
            return -1;
        }
    })
    res.status(200).json(goal);
})

const sortSales = asyncHandler(async (req, res) => {
    
    let goal = await Goal.find({user: req.body.id})
    goal = goal.sort((a, b) => {
        if(a.sales > b.sales)
        {
            return -1;
        }
    })
    res.status(200).json(goal);
})

const search = asyncHandler(async (req, res) => {
    console.log('lololol')
    console.log(req.body)
    if(!req.body.item_name)
    {
        res.status(400);
        throw new Error('Please add all required fields');
    }
    const user = req.user[0];
    if(!req.user[0])
    {
        res.status(400);
        throw new Error('User not authorized')
    }

    const item_name = await Goal.find({item_name: req.body.item_name})
    const brand_name = await Goal.find({brand_name: req.body.item_name})
    console.log(user)
    let array = []
    if(item_name.length != 0)
    {
        console.log('item_name')
        for(let i = 0; i < item_name.length; i++)
        {
            if(item_name[i].user.toString() == user.id) //user id of ITEM and id of USER must match
            {       
                array.push(item_name[i]);                
            }
        }
    }
    
    if(brand_name.length != 0)
    {   
        console.log(brand_name[0])
        for(let i = 0; i < brand_name.length; i++)
        {
            console.log(brand_name[i])
            if(brand_name[i].user.toString() == user.id) //user id of ITEM and id of USER must match
            {     
                console.log()  
                array.push(brand_name[i]);
            }
        }
    }
    res.status(200).json(array)    
})

const clear = asyncHandler(async(req, res) => {
    console.log('id: ', req.body)
    let goal = await Goal.find({user: req.body.id})
    console.log(goal)
    for(let i = 0; i < goal.length; i++)
    {
        await Goal.findByIdAndUpdate(goal[i]._id, {$set: {quantity_sold: 0}}, {new:true})
        await Goal.findByIdAndUpdate(goal[i]._id, {$set: {sales: 0}}, {new: true})
    }
})

const applyDiscount = asyncHandler(async(req, res) => {
    console.log(req.body)
    let goal = await Goal.find({user: req.body.id})
    const dis = (100 - parseInt(req.body.dis)) / 100
    console.log("loloko", dis)
    await User.findByIdAndUpdate(req.body.id, {$set: {discount: dis}})
    for(let i = 0; i < goal.length; i++)
    {
        await Goal.findByIdAndUpdate(goal[i]._id, {$set: {price: goal[i].price * dis}})
    }
})

const revokeDiscount = asyncHandler(async (req, res) => {
    console.log("revoke: ", req.body)
    let goal = await Goal.find({user: req.body.id})
    if(req.user[0].discount != 0)
    {
        for(let i = 0; i < goal.length; i++)
        {
            await Goal.findByIdAndUpdate(goal[i]._id, {$set: {price: goal[i].price / req.user[0].discount}})
        }
        await User.findByIdAndUpdate(req.body.id, {$set: {discount: 0}})
    
    }
    
})

module.exports = {
    getGoals, postGoals, putGoals, deleteGoals,  billing, sortQuantity, sortSales, search, clear, applyDiscount,
    revokeDiscount,
}