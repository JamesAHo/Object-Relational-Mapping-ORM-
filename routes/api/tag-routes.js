const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
 try {
  Tag.findAll({
    attributes: ['id','tag_name'],
    include: [
      {
        model: Product, attributes: ['id', 'product_name','price','stock','category_id']
      }
    ]
  }).then(TagDataInfo => res.json(TagDataInfo)); 
 } catch (error) {
  console.log(error);
  res.status(404).json({message: error.message});
 }
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    Tag.findOne({
      where: {
        id: req.params.id
      }
    }).then((TagDataInfo) => {
      if(!TagDataInfo) {
        res.status(404).json({message:"id not found"})
      }
      res.json(TagDataInfo)
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({message: error})
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    Tag.create({
      tag_name: req.body.tag_name
    }).then((TagDataInfo) => {
      res.json(TagDataInfo)
    })
  } catch (error) {
    
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    }).then((TagDataInfo) => {
      if(!TagDataInfo) {
        return res.status(404).json({message: 'tags not found'});
      }
      res.json(TagDataInfo)
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({message: error})
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    }).then((TagDataInfo)=> {
      if( !TagDataInfo) {
        res.status(404).json({message:'invalid id'})
        return;
      }
      res.json(TagDataInfo)
    })
  } catch (error) {
    console.log(error)
    res.status(505).json({message: error})
  }
});

module.exports = router;
