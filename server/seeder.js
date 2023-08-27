require('dotenv').config();
const ProductModel = require('./models/product.model');
const mongoose = require('mongoose');
const UserModel = require('./models/user.model');
const userService = require('./services/user.service');

const categories = [
  { categoryId: 1, categoryName: 'Snacks' },
  { categoryId: 2, categoryName: 'Beverages' },
  { categoryId: 3, categoryName: 'Stationery' },
  { categoryId: 4, categoryName: 'Personal Care' },
  { categoryId: 5, categoryName: 'Cooking' },
  { categoryId: 5, categoryName: 'Household' },
];

const dummyProducts = [];

const dummyUser = {
  name: 'Bobby',
  email: 'bobby@gmail.com',
  password: 'password123',
};

// Function to generate a random SKU (6 capitalized letters randomly placed)
function generateSKU() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let sku = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    sku += letters.charAt(randomIndex);
  }
  return sku;
}

// Function to generate a random price
function generatePrice() {
  const harga = generateRandomNumber(1000, 200000);
  return Math.floor(harga / 1000) * 1000; // Ensure full zeros
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 100 products
for (let i = 1; i <= 100; i++) {
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const sku = generateSKU();
  const name = `Product ${i}`;
  const description = `Product ${i} is useful and solves real problems. It makes people's lives easier or better in some way.`;
  const weight = generateRandomNumber(50, 1000);
  const width = generateRandomNumber(2, 30);
  const length = generateRandomNumber(2, 30);
  const height = generateRandomNumber(2, 30);
  const imageId = generateRandomNumber(1, 900);
  const imageUrl = `https://picsum.photos/id/${imageId}/1000/1000`;
  const harga = generatePrice();

  dummyProducts.push({
    categoryId: randomCategory.categoryId,
    categoryName: randomCategory.categoryName,
    sku,
    name,
    description,
    weight,
    width,
    length,
    height,
    image: imageUrl,
    harga,
  });
}

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database. Initializing Seeder...');

    await seedProducts();
    await seedUser();
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

async function seedUser() {
  try {
    await UserModel.deleteMany({});

    await userService.register(dummyUser);

    console.log('User seeded successfully');
  } catch (error) {
    console.error('Error seeding user:', error);
  }
}

async function seedProducts() {
  try {
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(dummyProducts);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

connectToDatabase();
