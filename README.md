# Career Guidance System

A complete MERN stack web application that helps students choose suitable career paths based on their interests, skills, and educational background. The system uses an MCQ-based assessment and a rule-based recommendation system to suggest careers.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **User Profile**: Store user details, education, and interests
- **MCQ Assessment**: Interactive assessment with multiple-choice questions
- **Career Recommendations**: Rule-based system that recommends careers based on assessment scores
- **Career Details**: Comprehensive information about each career including:
  - Required skills
  - Career roadmap (Education → Skills → Certifications → Internship → Job)
  - Salary range
  - Growth opportunities
- **Admin Functionality**: Add, update, and delete careers and questions (optional)

## Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Axios for API calls
- CSS3 (Custom styling)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
career/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── assessmentController.js
│   │   ├── questionController.js
│   │   └── careerController.js
│   ├── data/
│   │   └── seedData.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   └── Career.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── assessmentRoutes.js
│   │   ├── questionRoutes.js
│   │   └── careerRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── Auth.css
│   │   │   ├── Assessment.js
│   │   │   ├── Assessment.css
│   │   │   ├── Result.js
│   │   │   ├── Result.css
│   │   │   ├── CareerDetail.js
│   │   │   └── CareerDetail.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career_guidance
JWT_SECRET=career_guidance_super_secret_jwt_key_2024_change_in_production
NODE_ENV=development
```

**IMPORTANT**: The `.env` file is REQUIRED. Without it, you will get a "secretOrPrivateKey must have a value" error when trying to login or register. Make sure to create this file before starting the server.

4. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

5. Seed the database with sample data:
```bash
node data/seedData.js
```

6. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Users
- `PUT /api/users/profile` - Update user profile (Protected)
- `GET /api/users` - Get all users (Admin only)

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create question (Admin only)
- `PUT /api/questions/:id` - Update question (Admin only)
- `DELETE /api/questions/:id` - Delete question (Admin only)

### Assessment
- `POST /api/assessment/submit` - Submit assessment answers (Protected)
- `GET /api/assessment/results` - Get assessment results (Protected)

### Careers
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get single career
- `POST /api/careers` - Create career (Admin only)
- `PUT /api/careers/:id` - Update career (Admin only)
- `DELETE /api/careers/:id` - Delete career (Admin only)

## Usage

1. **Register/Login**: Create an account or login to access the assessment
2. **Take Assessment**: Answer the MCQ questions about your interests and preferences
3. **View Results**: See your category scores and recommended careers
4. **Explore Careers**: Click on any recommended career to view detailed information including roadmap, skills, and salary range

## Assessment Logic

The system calculates scores across five categories:
- Technology
- Management
- Creativity
- Analytical
- Communication

Each question option contributes points to these categories. The final scores are calculated as percentages, and careers are recommended based on:
- Categories scoring above 70% threshold
- Top 2 categories if no category meets the threshold
- Maximum of 5 career recommendations

## Sample Data

The seed script includes:
- 5 sample assessment questions
- 5 sample careers:
  - Software Developer (Technology)
  - Data Analyst (Analytical)
  - Project Manager (Management)
  - UX/UI Designer (Creativity)
  - Marketing Manager (Communication)

## Creating an Admin User

To create an admin user, you can use MongoDB shell or a GUI tool:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or use the MongoDB Compass or any MongoDB client to update the user document.

## Development

### Backend Development
- Uses Express.js with MVC pattern
- RESTful API design
- JWT authentication middleware
- Error handling middleware

### Frontend Development
- React functional components with hooks
- Context API for state management
- React Router for navigation
- Axios for HTTP requests
- Responsive design

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify MongoDB is accessible on the specified port

### CORS Issues
- Backend has CORS enabled for all origins (development)
- For production, configure CORS to allow only your frontend domain

### Authentication Issues
- Ensure JWT_SECRET is set in `.env`
- Check token expiration (default: 30 days)
- Verify Authorization header format: `Bearer <token>`

## Future Enhancements

- [ ] Add more assessment questions
- [ ] Implement career comparison feature
- [ ] Add user dashboard with assessment history
- [ ] Implement email notifications
- [ ] Add career bookmarking feature
- [ ] Create admin panel UI
- [ ] Add more career categories and options
- [ ] Implement machine learning-based recommendations

## License

This project is open source and available for educational purposes.

## Author

Created as a college-level MERN stack project demonstrating full-stack development skills.

## Support

For issues or questions, please check the code comments or create an issue in the repository.
