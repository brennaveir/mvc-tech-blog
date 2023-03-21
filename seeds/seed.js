const { sequelize } = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  })

  for (const blogpost of blogpostData) {
    await Blogpost.create({
      ...blogpost,
      username: users.username,
      comment: comments.text
      
    });
  }

  process.exit(0);
};

seedDatabase();
