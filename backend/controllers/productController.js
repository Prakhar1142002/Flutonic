const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// Create product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  }); //201 status for successful creation
});

// Get all products details
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage); // more appropriate is req.query.keyword but we can access it in another component using .keyword
  // const products = await Product.find(); // Product.find() is equal to apiFeatures.query
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
  }); //200 status for success
});

// Get single product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  //next is a callback func
  const product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(500).json({
    //     success: false,
    //     message: "Product not found"
    // })   // we can do like this but as you can see every time this code is repeating so we'll handle error more professionally

    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id); //let used as we have to update

  if (!product) {
    // return res.status(500).json({
    //     success: false,
    //     message: "Product not found"
    // })

    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(500).json({
    //     success: false,
    //     message: "Product not found"
    // })

    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//   exports.createProduct = catchAsyncErrors(async (req, res, next) => {
//     let images = [];

//     if (typeof req.body.images === "string") {
//       images.push(req.body.images);
//     } else {
//       images = req.body.images;
//     }

//     const imagesLinks = [];

//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "products",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//     req.body.user = req.user.id;

//     const product = await Product.create(req.body);

//     res.status(201).json({
//       success: true,
//       product,
//     });
//   });

//   // Get All Product
//   exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
//     const resultPerPage = 8;
//     const productsCount = await Product.countDocuments();

//     const apiFeature = new ApiFeatures(Product.find(), req.query)
//       .search()
//       .filter();

//     let products = await apiFeature.query;

//     let filteredProductsCount = products.length;

//     apiFeature.pagination(resultPerPage);

//     products = await apiFeature.query;

//     res.status(200).json({
//       success: true,
//       products,
//       productsCount,
//       resultPerPage,
//       filteredProductsCount,
//     });
//   });

//   // Get All Product (Admin)
//   exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
//     const products = await Product.find();

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   });

//   // Get Product Details
//   exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new ErrorHander("Product not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   });

//   // Update Product -- Admin

//   exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new ErrorHander("Product not found", 404));
//     }

//     // Images Start Here
//     let images = [];

//     if (typeof req.body.images === "string") {
//       images.push(req.body.images);
//     } else {
//       images = req.body.images;
//     }

//     if (images !== undefined) {
//       // Deleting Images From Cloudinary
//       for (let i = 0; i < product.images.length; i++) {
//         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//       }

//       const imagesLinks = [];

//       for (let i = 0; i < images.length; i++) {
//         const result = await cloudinary.v2.uploader.upload(images[i], {
//           folder: "products",
//         });

//         imagesLinks.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });
//       }

//       req.body.images = imagesLinks;
//     }

//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   });

//   // Delete Product

//   exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new ErrorHander("Product not found", 404));
//     }

//     // Deleting Images From Cloudinary
//     for (let i = 0; i < product.images.length; i++) {
//       await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//     }

//     await product.remove();

//     res.status(200).json({
//       success: true,
//       message: "Product Delete Successfully",
//     });
//   });
