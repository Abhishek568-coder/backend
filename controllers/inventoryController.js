const inventory = require("../model/inventoryData");

// CREATE
exports.addItem = (req,res)=>{
    const {name,category,quantity,price} = req.body;

    const item = {
        id: Date.now().toString(),
        name,
        category,
        quantity,
        price
    };

    inventory.push(item);

    res.json({
        message:"Item added",
        data:item
    });
};


// READ + FILTER + SEARCH
exports.getItems = (req,res)=>{
    let result = [...inventory];

    if(req.query.category){
        result = result.filter(i =>
            i.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }

    if(req.query.minQty){
        result = result.filter(i =>
            i.quantity >= Number(req.query.minQty)
        );
    }

    if(req.query.search){
        result = result.filter(i =>
            i.name.toLowerCase().includes(req.query.search.toLowerCase())
        );
    }

    res.json(result);
};


// READ ONE
exports.getItemById = (req,res)=>{
    const item = inventory.find(i => i.id === req.params.id);

    if(!item){
        return res.status(404).json({message:"Item not found"});
    }

    res.json(item);
};


// UPDATE
exports.updateItem = (req,res)=>{
    const item = inventory.find(i => i.id === req.params.id);

    if(!item){
        return res.status(404).json({message:"Item not found"});
    }

    const {name,category,quantity,price} = req.body;

    if(name) item.name = name;
    if(category) item.category = category;
    if(quantity !== undefined) item.quantity = quantity;
    if(price !== undefined) item.price = price;

    res.json({
        message:"Item updated",
        data:item
    });
};


// DELETE
exports.deleteItem = (req,res)=>{
    const index = inventory.findIndex(i => i.id === req.params.id);

    if(index === -1){
        return res.status(404).json({message:"Item not found"});
    }

    inventory.splice(index,1);

    res.json({message:"Item deleted"});
};