const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");

exports.getCategories = async (req, res) => {
  const categories = await CategoryModel.find();
  res.status(200).send(categories);
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).send(category);
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  res.status(200).send(category);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  res.status(200).send(category);
};