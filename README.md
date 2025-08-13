# 🎆 Mahalaxmi Fireworks Store

A professional, elegant, and vibrant website for a fireworks and celebration business built with the MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

- **Homepage** with large banner, brief intro, and call-to-action buttons
- **About Us** section with company information and mission
- **Products Page** showcasing fireworks in a grid format with filtering and search
- **Contact Page** with inquiry form and Google Maps integration
- **Mobile-responsive** design with bright and festive colors
- **Instagram/WhatsApp** contact buttons
- **SEO-friendly** and fast-loading
- **Festive, trustworthy, and family-friendly** tone

## 🚀 Tech Stack

### Frontend
- React 19
- React Router DOM
- Vite
- Lucide React Icons
- Axios
- CSS3 with modern features

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- RESTful API

## 📁 Project Structure

```
mahalaxmifireworks-store/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── public/            # Static files
│   ├── server.js          # Main server file
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/mahalaxmi-fireworks
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get single product

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact inquiries (admin)

## 🎨 Design Features

- **Vibrant Color Scheme**: Reds, yellows, blues, and gradients
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and hover effects
- **Modern UI**: Clean, professional layout
- **Accessibility**: ARIA labels, focus states, and semantic HTML

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1200px+)

## 🔧 Customization

### Colors
The main color palette can be customized in the CSS files:
- Primary: `#ff6b6b` (Red)
- Secondary: `#ff8e53` (Orange)
- Accent: `#ffd93d` (Yellow)
- Success: `#6bcf7f` (Green)

### Content
- Update company information in component files
- Modify product categories in the Products component
- Change contact details in the Contact component
- Update social media links in the Footer

## 📸 Sample Data

To populate the database with sample products, you can create a script or manually add products through the API. Each product should have:
- Name
- Description
- Price
- Category
- Image URL
- Availability status
- Featured flag

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Use a process manager like PM2
3. Deploy to platforms like Heroku, DigitalOcean, or AWS

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

## 🔒 Security Features

- Input validation on forms
- CORS configuration
- Environment variable protection
- MongoDB injection protection

## 📈 Performance Optimization

- Lazy loading of images
- CSS animations with `transform` and `opacity`
- Efficient React component structure
- Optimized bundle size with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact:
- Email: info@mahalaxmifireworks.com
- Phone: +91 98765 43210
- WhatsApp: +91 98765 43210

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- Design inspiration from modern e-commerce websites
- Community contributors and feedback

---

**Made with ❤️ for celebrating life's special moments with Mahalaxmi Fireworks**
