# Finance Dashboard System

A comprehensive financial management platform with role-based access control (RBAC), built with React frontend and Node.js/Express backend. The system provides different dashboards for Viewers, Analysts, and Admins to manage and analyze financial data.

## 🌐 Live Demo

### Deployed Links
- **Frontend (Vercel)**: [https://finance-dashboard-system-zorvyn.vercel.app/](https://finance-dashboard-system-zorvyn.vercel.app/)
- **Backend API**: [https://finance-dashboard-backend-zorvyn.vercel.app/](https://finance-dashboard-backend-zorvyn.vercel.app/)

### Test Credentials
Use these accounts to explore different user roles:
- **Admin**: `admin@wealthflow.com` / `admin123`
- **Analyst**: `analyst@wealthflow.com` / `analyst123`
- **Viewer**: `viewer@wealthflow.com` / `viewer123`

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

## 🧠 Technical Decisions and Trade-offs

### Frontend Framework: React with Vite
**Decision**: Chose React 19 with Vite as the build tool over alternatives like Vue.js, Angular, or Next.js.

**Rationale**:
- **Modern React**: React 19 provides the latest features and performance improvements
- **Vite**: Extremely fast development server and build times compared to Create React App
- **Component-based**: Perfect for role-based UI components (Admin, Analyst, Viewer)
- **Ecosystem**: Rich ecosystem of libraries and community support

**Trade-offs**:
- **Learning Curve**: React has a steeper learning curve than Vue.js
- **Bundle Size**: React is larger than some alternatives, but Vite's tree-shaking mitigates this
- **No SSR**: Chose client-side rendering for simplicity, sacrificing initial load performance

### Backend Framework: Node.js with Express
**Decision**: Node.js/Express over alternatives like Python/FastAPI, Java/Spring, or Go.

**Rationale**:
- **JavaScript Full-stack**: Same language for frontend and backend simplifies development
- **NPM Ecosystem**: Access to vast number of packages and middleware
- **Performance**: Non-blocking I/O perfect for API serving
- **Deployment**: Easy deployment to platforms like Heroku, Vercel, or Railway

**Trade-offs**:
- **Type Safety**: No built-in type checking (considered TypeScript but chose plain JS for simplicity)
- **Single-threaded**: Not ideal for CPU-intensive tasks, but fine for I/O-bound financial APIs
- **Callback Hell**: Managed with async/await, but requires careful error handling

### Database: MongoDB with Mongoose
**Decision**: MongoDB over SQL databases like PostgreSQL or MySQL.

**Rationale**:
- **Flexible Schema**: Financial transactions can have varying fields and categories
- **JSON-like Documents**: Natural fit for JavaScript applications
- **Scalability**: Easy horizontal scaling for growing financial data
- **Mongoose ODM**: Provides schema validation and relationship management

**Trade-offs**:
- **ACID Compliance**: Eventual consistency vs. strong consistency of SQL databases
- **Joins**: No native joins - requires application-level data aggregation
- **Data Integrity**: Relies on application logic rather than database constraints

### Authentication: JWT (JSON Web Tokens)
**Decision**: Stateless JWT authentication over session-based auth.

**Rationale**:
- **Scalability**: No server-side session storage required
- **Microservices-ready**: Tokens can be validated independently
- **Mobile-friendly**: Perfect for potential future mobile app integration
- **Security**: Can include expiration and refresh token patterns

**Trade-offs**:
- **Token Storage**: Client-side storage (localStorage) vulnerable to XSS
- **No Server Logout**: Cannot invalidate tokens server-side without additional complexity
- **Payload Size**: Larger than session IDs, increasing request size

### UI Framework: TailwindCSS
**Decision**: Utility-first CSS with TailwindCSS over component libraries like Material-UI or Bootstrap.

**Rationale**:
- **Custom Design**: Complete design control without framework constraints
- **Performance**: Only includes used CSS in production builds
- **Consistency**: Utility classes ensure consistent spacing and colors
- **Responsive**: Built-in responsive utilities perfect for dashboard layouts

**Trade-offs**:
- **Learning Curve**: Requires learning utility classes vs. semantic class names
- **HTML Bloat**: Longer class strings in JSX, but mitigated by purging
- **Maintenance**: Custom components require more styling effort than pre-built ones

### State Management: React Hooks + Context
**Decision**: React's built-in useState and useContext over external libraries like Redux or Zustand.

**Rationale**:
- **Simplicity**: No additional dependencies for simple state management
- **React Native**: Same patterns work for potential mobile app
- **Performance**: React's optimization handles most use cases
- **Modern React**: Hooks provide clean, functional state management

**Trade-offs**:
- **Scalability**: For very complex apps, Redux provides better debugging tools
- **Boilerplate**: Simple apps don't need Redux's structure
- **Debugging**: No time-travel debugging like Redux DevTools

### Chart Library: Recharts
**Decision**: Recharts over alternatives like Chart.js, D3.js, or Victory.

**Rationale**:
- **React Integration**: Native React components, no DOM manipulation
- **Lightweight**: Smaller bundle size than D3.js
- **Customizable**: Enough customization for financial dashboards
- **Responsive**: Automatically adapts to container sizes

**Trade-offs**:
- **Features**: Less powerful than D3.js for complex visualizations
- **Customization**: Limited compared to fully customizable Chart.js
- **Learning**: Specific API to learn vs. more standard Chart.js

## 🧪 Testing

### Test Credentials
Use these pre-configured accounts to test different user roles and permissions:

#### Admin User
- **Email**: `Admin@gmail.com`
- **Password**: `1234`
- **Role**: Admin
- **Access**: Full system access - user management, transaction CRUD, dashboard analytics

#### Analyst User
- **Email**: `Analyst@gmail.com`
- **Password**: `1234`
- **Role**: Analyst
- **Access**: Dashboard analytics and transaction viewing

#### Viewer User
- **Email**: `Viewer@gmail.com`
- **Password**: `1234`
- **Role**: Viewer
- **Access**: Read-only access to transaction data

### Testing Instructions
1. Start both backend and frontend servers as described in the Installation section
2. Navigate to `http://localhost:5173`
3. Use the test credentials above to login and explore different role capabilities
4. Test role-based access by attempting actions restricted to other roles

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
## 📋 Additional Notes

### Known Limitations
- **No TypeScript**: The project uses plain JavaScript, which lacks compile-time type checking and can lead to runtime errors
- **Basic Error Handling**: Limited error boundaries and user feedback for failed operations
- **No Pagination**: Transaction lists may become slow with large datasets
- **No Real-time Updates**: Changes require manual page refresh to reflect
- **Client-side Token Storage**: JWT tokens stored in localStorage are vulnerable to XSS attacks
- **No Input Validation**: Frontend forms lack comprehensive validation and sanitization
- **No Rate Limiting**: API endpoints are unprotected against abuse
- **No Audit Logging**: No tracking of user actions or system events
- **No Backup/Recovery**: No automated database backups or recovery mechanisms
- **No Testing Framework**: Lack of unit tests, integration tests, or end-to-end tests

### Setup Prerequisites
- **Node.js**: Version 16 or higher required
- **MongoDB**: Local installation or cloud instance (MongoDB Atlas)
- **Network**: Backend requires port 5000, frontend uses port 5173
- **Environment Variables**: Must configure `.env` files for both frontend and backend
- **npm**: Package manager for dependency installation

### Security Considerations
- **JWT Secret**: Use a strong, randomly generated secret in production
- **Password Hashing**: bcryptjs provides adequate protection, but consider argon2 for enhanced security
- **CORS**: Currently allows all origins - restrict in production
- **Input Sanitization**: Add validation to prevent injection attacks
- **HTTPS**: Essential for production deployment to protect token transmission

### Performance Considerations
- **Database Queries**: No indexing strategy implemented for large datasets
- **Bundle Size**: Frontend bundle could be optimized further
- **API Response Time**: No caching layer implemented
- **Concurrent Users**: Single-threaded Node.js may struggle with high concurrency

### Areas for Improvement
- **TypeScript Migration**: Add type safety and better IDE support
- **Testing Suite**: Implement Jest/Vitest for unit tests and Cypress for E2E tests
- **Error Boundaries**: Add React error boundaries for better error handling
- **Loading States**: Implement skeleton loaders and loading indicators
- **Form Validation**: Add comprehensive client-side validation with libraries like Zod
- **API Documentation**: Generate Swagger/OpenAPI documentation
- **Caching**: Implement Redis for session and data caching
- **Logging**: Add structured logging with Winston or similar
- **Monitoring**: Integrate application monitoring and alerting
- **CI/CD Pipeline**: Set up automated testing and deployment
- **Docker**: Containerize the application for easier deployment
- **Security**: Implement rate limiting, input sanitization, and security headers
- **Password Reset**: Add forgot password functionality with email verification
- **Notifications**: Implement email/SMS notifications for important events
- **Data Export**: Add CSV/PDF export functionality for reports
- **Search/Filter**: Implement advanced search and filtering capabilities
- **Data Visualization**: Enhance charts with more interactive features
- **Mobile App**: Consider React Native for mobile companion app
- **Multi-tenancy**: Support for multiple organizations/companies
- **API Versioning**: Implement proper API versioning for future changes

### Development Notes
- **Architecture**: Clean separation between frontend and backend with clear API contracts
- **Code Organization**: Logical folder structure with separation of concerns
- **Role-based Access**: Implemented comprehensive RBAC with middleware protection
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern Stack**: Uses latest versions of React, Node.js, and supporting libraries

### Future Enhancements
- **Real-time Features**: WebSocket integration for live updates
- **Advanced Analytics**: Machine learning insights and predictive analytics
- **Integration APIs**: Connect with banking APIs, payment processors
- **Multi-language**: Internationalization support
- **Theme Customization**: User-configurable themes and layouts
- **Offline Support**: Progressive Web App features for offline functionality
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