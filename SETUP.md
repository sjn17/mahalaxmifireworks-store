# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## ⚡ Quick Start

### 1. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment
```bash
# Copy the sample environment file
cd server
copy env.sample .env
```

Edit `server/.env` and update the `MONGO_URI` if needed:
```env
MONGO_URI=mongodb://localhost:27017/mahalaxmi-fireworks
PORT=5000
NODE_ENV=development
```

### 3. Start the Application

#### Option A: Use the startup scripts
- **Windows**: Double-click `start.bat`
- **PowerShell**: Run `.\start.ps1`

#### Option B: Manual startup
```bash
# Terminal 1 - Start Server
cd server
npm run dev

# Terminal 2 - Start Client
cd client
npm run dev
```

### 4. Seed the Database (Optional)
```bash
cd server
npm run seed
```

## 🌐 Access the Website
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📱 Features to Test
1. **Homepage**: Large banner, features, featured products
2. **About**: Company story, mission, values, team
3. **Products**: Browse, filter, search fireworks
4. **Contact**: Submit form, view contact info, Google Maps

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Try `mongodb://127.0.0.1:27017/mahalaxmi-fireworks`

### Port Already in Use
- Change the port in `server/.env`
- Kill processes using the ports: `netstat -ano | findstr :5000`

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📚 Next Steps
- Customize company information
- Add real product images
- Update contact details
- Deploy to production

## 🆘 Need Help?
Check the main README.md for detailed documentation and troubleshooting.
