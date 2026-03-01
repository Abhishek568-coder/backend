module.exports = (req,res,next)=>{
    const {name,category,quantity,price} = req.body;

    if(!name || !category || quantity == null || price == null){
        return res.status(400).json({
            message:"All fields (name, category, quantity, price) are required"
        });
    }

    if(quantity < 0 || price < 0){
        return res.status(400).json({
            message:"Quantity and price must be positive"
        });
    }

    next();
};