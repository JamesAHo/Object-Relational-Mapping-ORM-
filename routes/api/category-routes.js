const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 // find all categories
    // be sure to include its associated Products
    Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
          {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
      ]
  })
      .then(CategoryInfo => res.json(CategoryInfo))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    Category.findOne({
      where: {id: req.params.id},attributes: ['id','category_name'],include:[{model: Product, attributes: ['id', 'product_name', 'price','stock','category_id']}]
    }).then((CategoryInfo) => {
      if (!CategoryInfo) {
        res.status(404).json({message: 'No id Found'});
        return;
      }
      res.json(CategoryInfo)
    })
      
    }
    
   catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create({
      category_name: req.body.category_name
    }).then((CategoryInfo) => {
      res.json(CategoryInfo)
    })
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then((CategoryInfo)=> {
      if(!CategoryInfo) {
        res.status(404).json({message: "no category found"});
        return;
      }
      res.json(CategoryInfo)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {id:req.params.id}
    }).then((CategorieInfo)=> {
      if(!CategorieInfo) {
        res.status(404).json({message:"invalid category id"})
        return;
      }
      res.json(CategorieInfo)
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(err)
  }
});

module.exports = router;
