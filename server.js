const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const upload = require('./multer')
const cloudinary = require('cloudinary');
const async = require('async')
var {mongoose} = require('./db/mongoose');
var {Point} = require('./models/details');
var {NewProducts} =  require('./models/new');
var {MegaSale} =  require('./models/mega');


require('./cloudinary')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))



app.get('/api/newProducts', async (req, res) => {

  const newProducts = await NewProducts.find({})
  console.log(newProducts);
  res.send(newProducts)
  
 
})

app.get('/api/megaSale', async (req, res) => {

  const megaSale = await MegaSale.find({})
  console.log(megaSale);
  res.send(megaSale)
  
 
})


app.get('/api/pointofsale', async (req, res) => {

  const point = await Point.find({})
  console.log(point);
  res.send(point)
  
 
})






app.get('/images', async (req, res) => {
  const point = await Image.find({})
  console.log(images);
  res.render('images',{
    images
  })
})

// app.get('/', async (req, res) => {
//   const point = await Point.find({})
//   console.log(point);
//   res.render('images',{
//     point
//   })
// })

app.get('/', async (req, res) => {
  
  async.concat([Point,MegaSale,NewProducts],function(model,callback) {
    var query = model.find({});
    query.exec(function(err,docs) {
      if (err) throw err;
      callback(err,docs);
    });
  },
  function(err,result) {
    if (err) throw err;

   console.log(result)
    res.render('images',{
      result
   
  
  });
  

  })
})








app.get('/point', (req, res) => {
  res.render('pointOfsale')
})

app.get('/sale', (req, res) => {
  res.render('megaSale')
})

app.get('/new', (req, res) => {
  res.render('newlyArrived')
})


app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/dashboard', async(req, res) => {
  const point = await Point.find({})
  console.log(point);
  res.render('dashboard',{
    point
  })
})



app.post('/mega', upload.single('image'), async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const product_name = req.body.product_name;
  const product_price=req.body.product_price;
  const product_title=req.body.product_title;
  const product_barcode=req.body.product_barcode;
  const product_details=req.body.product_details;

  console.log(product_name);
  var mega = new MegaSale({
    imageUrl:result.secure_url,
    Product_Name:product_name,
    Product_Price:product_price,
    Product_Title:product_title,
    Product_Barcode:product_barcode,
    Product_Details:product_details
  })
  mega.save()
  .then((url)=>{
    console.log(url);
    res.send(url)
  }).catch(e=>console.log(e))
  // image.imageUrl = result.secure_url;
  // await image.save();
  // res.send({
  //   message: 'Blog is Created'
  // })
  res.redirect("/");
})


app.post('/point', upload.single('image'), async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const product_name = req.body.product_name;
  const product_price=req.body.product_price;
  const product_title=req.body.product_title;
  const product_barcode=req.body.product_barcode;
  const product_details=req.body.product_details;

  console.log(product_name);
  var point = new Point({
    imageUrl:result.secure_url,
    Product_Name:product_name,
    Product_Price:product_price,
    Product_Title:product_title,
    Product_Barcode:product_barcode,
    Product_Details:product_details
  })
  point.save()
  .then((url)=>{
    console.log(url);
    res.send(url)
  }).catch(e=>console.log(e))
  // image.imageUrl = result.secure_url;
  // await image.save();
  // res.send({
  //   message: 'Blog is Created'
  // })
  res.redirect("/");
})


app.post('/delete', (req, res) => {
  var id = req.body.id;
  Point.findByIdAndRemove(id, function (err, deletedStandUp) {
    // handle any potential errors here
    res.redirect('/dashboard');        
  });
})


app.post('/deleteAll', (req, res) => {

  Point.deleteMany({})
  .then((res)=>{
    console.log(res)
  })
res.redirect('/dashboard')
})

app.post('/new', upload.single('image'), async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const product_name = req.body.product_name;
  const product_price=req.body.product_price;
  const product_title=req.body.product_title;
  const product_barcode=req.body.product_barcode;
  const product_details=req.body.product_details;

  console.log(product_name);
  var newproducts = new NewProducts({
    imageUrl:result.secure_url,
    Product_Name:product_name,
    Product_Price:product_price,
    Product_Title:product_title,
    Product_Barcode:product_barcode,
    Product_Details:product_details
  })
  newproducts.save()
  .then((url)=>{
    console.log(url);
    res.send(url)
  }).catch(e=>console.log(e))
  // image.imageUrl = result.secure_url;
  // await image.save();
  // res.send({
  //   message: 'Blog is Created'
  // })
  res.redirect("/");
})



const PORT = 7777
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`)
})
