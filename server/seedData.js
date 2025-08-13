const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  // Rockets Category
  {
    name: "Diwali Rocket Pack",
    description: "Spectacular rocket fireworks perfect for Diwali celebrations. Creates beautiful patterns in the sky with multiple colors and effects.",
    price: 299,
    category: "rockets",
    image: "https://picsum.photos/400/300?random=1",
    isAvailable: true,
    featured: true
  },
  {
    name: "Rainbow Rockets",
    description: "Multi-colored rockets that create rainbow patterns in the sky. A favorite among children and adults.",
    price: 349,
    category: "rockets",
    image: "https://picsum.photos/400/300?random=2",
    isAvailable: true,
    featured: false
  },
  {
    name: "Sky Burst Rockets",
    description: "High-flying rockets that burst into spectacular patterns at great heights. Perfect for large celebrations.",
    price: 449,
    category: "rockets",
    image: "https://picsum.photos/400/300?random=3",
    isAvailable: true,
    featured: false
  },

  // Crackers Category
  {
    name: "Thunder Crackers",
    description: "Loud and exciting crackers that create the traditional Diwali atmosphere. Safe and reliable for family celebrations.",
    price: 199,
    category: "crackers",
    image: "https://picsum.photos/400/300?random=4",
    isAvailable: true,
    featured: true
  },
  {
    name: "Lakshmi Crackers",
    description: "Traditional Lakshmi crackers that bring prosperity and joy. A must-have for Diwali celebrations.",
    price: 249,
    category: "crackers",
    image: "https://picsum.photos/400/300?random=5",
    isAvailable: true,
    featured: false
  },
  {
    name: "Deluxe Cracker Pack",
    description: "Premium cracker collection with various effects and sounds. Perfect for special occasions.",
    price: 399,
    category: "crackers",
    image: "https://picsum.photos/400/300?random=6",
    isAvailable: true,
    featured: false
  },

  // Bombs Category
  {
    name: "Boom Bomb",
    description: "High-impact bomb fireworks that create loud explosions and bright flashes. Not for residential areas.",
    price: 599,
    category: "bombs",
    image: "https://picsum.photos/400/300?random=7",
    isAvailable: true,
    featured: false
  },
  {
    name: "Thunder Bomb",
    description: "Powerful bomb that creates thunderous sound and bright light. Use in open areas only.",
    price: 699,
    category: "bombs",
    image: "https://picsum.photos/400/300?random=8",
    isAvailable: true,
    featured: false
  },

  // Sparklers Category
  {
    name: "Golden Sparklers",
    description: "Safe and fun sparklers for children and adults. Creates beautiful golden sparkles that last for minutes.",
    price: 99,
    category: "sparklers",
    image: "https://picsum.photos/400/300?random=9",
    isAvailable: true,
    featured: false
  },
  {
    name: "Rainbow Sparklers",
    description: "Colorful sparklers that change colors as they burn. A delight for children's parties.",
    price: 149,
    category: "sparklers",
    image: "https://picsum.photos/400/300?random=10",
    isAvailable: true,
    featured: false
  },
  {
    name: "Long Sparklers",
    description: "Extra-long sparklers that burn for extended periods. Perfect for celebrations and events.",
    price: 199,
    category: "sparklers",
    image: "https://picsum.photos/400/300?random=11",
    isAvailable: true,
    featured: false
  },

  // Fountains Category
  {
    name: "Sparkling Fountain",
    description: "Beautiful fountain fireworks that create cascading sparkles. Perfect for outdoor celebrations and parties.",
    price: 399,
    category: "fountains",
    image: "https://picsum.photos/400/300?random=12",
    isAvailable: true,
    featured: false
  },
  {
    name: "Golden Fountain",
    description: "Elegant golden fountain that creates a shower of golden sparks. Perfect for wedding celebrations.",
    price: 499,
    category: "fountains",
    image: "https://picsum.photos/400/300?random=13",
    isAvailable: true,
    featured: false
  },
  {
    name: "Multi-Color Fountain",
    description: "Vibrant fountain that cycles through multiple colors. A visual treat for any celebration.",
    price: 449,
    category: "fountains",
    image: "https://picsum.photos/400/300?random=14",
    isAvailable: true,
    featured: false
  },

  // Wheels Category
  {
    name: "Color Wheel",
    description: "Rotating wheel fireworks that create circular patterns of colors. Perfect for special occasions.",
    price: 499,
    category: "wheels",
    image: "https://picsum.photos/400/300?random=15",
    isAvailable: true,
    featured: true
  },
  {
    name: "Spinning Wheel",
    description: "High-speed spinning wheel that creates mesmerizing light patterns. A crowd favorite.",
    price: 599,
    category: "wheels",
    image: "https://picsum.photos/400/300?random=16",
    isAvailable: true,
    featured: false
  },

  // Other Category
  {
    name: "Silver Streamers",
    description: "Elegant silver streamer fireworks that create long trails of light. Perfect for wedding celebrations.",
    price: 449,
    category: "other",
    image: "https://picsum.photos/400/300?random=17",
    isAvailable: true,
    featured: false
  },
  {
    name: "Roman Candles",
    description: "Classic roman candles that shoot colorful balls into the sky. A traditional favorite.",
    price: 299,
    category: "other",
    image: "https://picsum.photos/400/300?random=18",
    isAvailable: true,
    featured: false
  },
  {
    name: "Ground Spinners",
    description: "Fun ground-based spinners that create colorful circular patterns on the ground.",
    price: 199,
    category: "other",
    image: "https://picsum.photos/400/300?random=19",
    isAvailable: true,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Display inserted products
    console.log('\n📦 Sample Products Added:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (₹${product.price}) - ${product.category}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
