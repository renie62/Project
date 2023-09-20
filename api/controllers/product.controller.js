import Product from "../models/product.model.js";
import { createError } from "../utils/createError.js";

export const createProduct = async (req, res, next) => {
  if (req.isAdmin) {
    const product = await Product.findOne({ title: req.body.title });
    if (product)
      return next(createError(403, "The product title already exists"));

    try {
      const newProduct = new Product({ ...req.body, userId: req.user.id });
      await newProduct.save();

      res.status(200).send("Product has been created");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const updateProduct = async (req, res, next) => {
  if (req.isAdmin) {
    const product = await Product.findOne({ title: req.body.title });
    if (product)
      return next(createError(403, "The product title already exists"));

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedProduct) return next(createError(404, "Product not found"));

      res.status(200).send("Product has been updated");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const deleteProduct = async (req, res, next) => {
  if (req.isAdmin) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return next(createError(404, "Product not found"));

      res.status(200).send("Product has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(createError(404, "Product not found"));

    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.category && { category: q.category }),
    ...(q.isLatest && { isLatest: q.isLatest }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
  };

  try {
    const products = await Product.find(filters).sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

export const updateLatestProduct = async (req, res, next) => {
  if (req.isAdmin) {
    try {
      const isLatest = req.body.isLatest;

      if (typeof isLatest !== "boolean") {
        return next(createError(400, "isLatest must be a boolean value"));
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { isLatest },
        { new: true }
      );

      if (!product) return next(createError(404, "Product not found"));

      res.status(200).send("Status has been updated");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};
