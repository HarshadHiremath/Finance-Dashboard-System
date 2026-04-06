# Finance Dashboard System

A comprehensive financial management platform with role-based access control (RBAC), built with React frontend and Node.js/Express backend. The system provides different dashboards for Viewers, Analysts, and Admins to manage and analyze financial data.

## 🚀 Features

### Role-Based Access Control
- **Viewer**: Read-only access to transaction data and basic analytics
- **Analyst**: Access to financial analytics and dashboard summaries
- **Admin**: Full system access including user management, transaction CRUD operations, and system administration

### Core Functionality
- **User Authentication**: JWT-based authentication with secure token verification
- **Transaction Management**: Create, read, update, and delete financial transactions
- **Financial Analytics**: Dashboard with charts and summaries using Recharts
- **User Management**: Admin panel for managing system users
- **Responsive Design**: Mobile-friendly interface built with TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Chart library for data visualization
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
finance-dashboard-system/
├── app-frontend/                 # React frontend application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # React components by role
│   │   │   ├── Admin.jsx         # Admin dashboard
│   │   │   ├── Analyst.jsx       # Analyst dashboard
│   │   │   ├── Viewer.jsx        # Viewer dashboard
│   │   │   ├── Login.jsx         # Authentication component
│   │   │   └── AuthLoader.jsx    # Route protection & role routing
│   │   ├── assets/               # Images and icons
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # App entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── server-backend/               # Node.js/Express backend
    ├── src/
    │   ├── config/
    │   │   └── db.js             # MongoDB connection
    │   ├── controllers/          # Route handlers
    │   │   ├── auth-controller.js
    │   │   ├── user-controller.js
    │   │   ├── transaction-controller.js
    │   │   └── dashboard-controller.js
    │   ├── middleware/
    │   │   ├── auth-middleware.js    # JWT authentication
    │   │   └── role-middleware.js    # Role authorization
    │   ├── models/               # MongoDB schemas
    │   │   ├── user-model.js
    │   │   └── transaction-model.js
    │   ├── routes/               # API routes
    │   │   ├── auth-routes.js
    │   │   ├── user-routes.js
    │   │   ├── transaction-routes.js
    │   │   └── dashboard-routes.js
    │   ├── utils/
    │   │   └── generateToken.js  # JWT token utilities
    │   ├── views/
    │   │   └── home-view.js      # HTML home page
    │   └── app.js                # Express app setup
    ├── server.js                 # Server entry point
    └── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd server-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server-backend` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/finance-dashboard
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. Start the backend server:
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `app-frontend` directory:
   ```env
   VITE_API=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/loginUser` - User login
- `GET /api/auth/verifyToken` - Verify JWT token

### User Management (Admin Only)
- `POST /api/user/createUser` - Create new user
- `GET /api/user/getAllUsers` - Get all users
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user

### Transactions
- `POST /api/transactions` - Create transaction (Admin)
- `GET /api/transactions` - Get transactions (All roles)
- `PUT /api/transactions/:id` - Update transaction (Admin)
- `DELETE /api/transactions/:id` - Delete transaction (Admin)

### Dashboard
- `GET /api/dashboard` - Get dashboard summary (Admin, Analyst)

## 🎨 User Roles & Permissions

| Feature | Viewer | Analyst | Admin |
|---------|--------|---------|-------|
| View Transactions | ✅ | ✅ | ✅ |
| View Dashboard | ❌ | ✅ | ✅ |
| Create Transactions | ❌ | ❌ | ✅ |
| Edit Transactions | ❌ | ❌ | ✅ |
| Delete Transactions | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

## 🗃️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (required),
  role: String (enum: ["Viewer", "Analyst", "Admin"]),
  isActive: Boolean,
  timestamps: true
}
```

### Transaction Model
```javascript
{
  amount: Number (required),
  type: String (enum: ["income", "expense"], required),
  category: String (required),
  date: Date (required),
  notes: String,
  timestamps: true
}
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables in your deployment platform
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set `NODE_ENV=production`
4. Use a process manager like PM2 for production

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Serve the `dist` folder using any static server
3. Update the `VITE_API` environment variable to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json files for details.

## 👨‍💻 Author

**Harshad** - *Initial work*

## 🙏 Acknowledgments

- React and Vite for the amazing frontend tooling
- Express.js community for the robust backend framework
- MongoDB for the flexible NoSQL database
- TailwindCSS for the utility-first styling approach</content>
<parameter name="filePath">d:\GitHub\Finance-Dashboard-System\README.md