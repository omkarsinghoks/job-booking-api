# Job Booking API

A Node.js RESTful API for job posting, company management, and applicant tracking.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User registration and authentication (JWT)
- Company creation and management
- Job posting and management
- Applicant tracking for jobs
- Role-based access (student, recruiter, admin)
- MongoDB database integration

---

## Tech Stack

- Node.js
- Express.js
- bcrypt 
- MongoDB & Mongoose
- JWT Authentication
- dotenv

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm
- MongoDB Atlas account or local MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/job-booking-api.git
   cd job-booking-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following (replace with your values):

     ```
     MONGO_URI="your-mongodb-uri"
     PORT=3000
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server:**
   ```bash
   npm run dev or npm start
   ```
   The server will run on `http://localhost:3000` by default.

---

## Environment Variables

| Variable      | Description                      |
|---------------|----------------------------------|
| MONGO_URI     | MongoDB connection string        |
| PORT          | Server port (default: 3000)      |
| JWT_SECRET    | Secret key for JWT authentication|

---

## API Endpoints

### User

- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Login and get JWT token
- `GET /api/users/profile` — get your profile details
- `PUT /api/users/profile` — Update your profile details


### Company

- `POST /api/companies/register` — Create a new company
- `GET /api/companies/all` — List all companies
- `GET /api/companies/:id` — Get the details of company
- `PUT /api/companies/:id` — update the company details

### Job

- `POST /api/jobs/register` — Create a new job (recruiter only)
- `GET /api/jobs/all` — List all jobs
- `GET /api/jobs/:id` — Get job by ID
- `PUT /api/jobs/:id` — Update job by ID
- `DELETE /api/jobs/:id` — Delete job by ID

### Applicant

- `POST /api/applicants/register` — Apply for a job
- `GET /api/applicants?;id` — List all applicants

---

## Testing with Postman

- Import the API endpoints into Postman.
- Use the sample JSON payloads provided in the documentation for each endpoint.
- Make sure to include the JWT token in the `Authorization` header for protected routes.

---

## Project Structure

```
job-booking-api/
│
├── controllers/
│   ├── userController.js
│   ├── companyController.js
│   ├── jobController.js
│   └── applicantController.js
│
├── models/
│   ├── userModel.js
│   ├── companyModel.js
│   ├── jobModel.js
│   └── applicantModel.js
│
├── routes/
│   ├── userRoutes.js
│   ├── companyRoutes.js
│   ├── jobRoutes.js
│   └── applicantRoutes.js
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---



## Contact

For questions or support, open an issue or contact(mailto:your- oksi6189@gmail.com).
