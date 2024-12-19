const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const monggoose = require('mongoose')
const { validationResult } = require('express-validator')
const findBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blogs.findMany({
      select : {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    res.status(200).send({
      success: true,
      data: blogs,
      message: 'Blogs retrieved successfully'
    })
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Error retrieving blogs"
    })
  }
}

const createBlog = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      success: false,
      message: "validation error",
      errors : errors.array()
    })
  }

  try {
    const blog = await prisma.blogs.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(blog);
    res.status(201).send({
      success: true,
      data: blog,
      message: 'Blog created successfully'
    });
  }catch(err){
    res.status(500).json({
      message : err.message
    })
  }
};

const findPostByid = async (req, res) => {
  const {id} = req.params;

  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        id: id,
      } , select : {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).send({
      success: true,
      data: blog,
      message: `Blog with id ${id} retrieved successfully`,
    });
  }catch(err){
    res.status(500).json({
      message : err.message
    })
  }
}

module.exports = {
  findBlogs,
  createBlog,
  findPostByid
};