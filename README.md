# Prescripto

Prescripto is a MERN healthcare appointment platform. Patients can browse doctors, book appointments, manage their profiles, and pay online. Administrators can manage doctors and appointments, while doctors can manage their availability and appointment status.

## Features

### Patient portal

- User registration and login
- Browse doctors by speciality
- View doctor profiles and available appointment slots
- Book and cancel appointments
- View and update profile details
- Razorpay appointment payments

### Admin and doctor portal

- Admin login and dashboard
- Add doctors with profile images
- View and manage doctors
- Toggle doctor availability
- View and cancel appointments
- Doctor login
- Doctor dashboard and profile
- Mark appointments as completed or cancelled

## Tech Stack

- React 19 with Vite
- React Router
- Tailwind CSS
- Axios
- Node.js and Express
- MongoDB with Mongoose
- JWT authentication
- Cloudinary image uploads
- Razorpay payments

## Project Structure

```text
Prescripto/
├── backend/    Express API, authentication, database models, and integrations
├── frontend/   Patient-facing React application
├── admin/      Admin and doctor React application
└── README.md
```

## Prerequisites

Install the following before starting:

- Node.js 18 or newer
- npm
- MongoDB or a MongoDB Atlas cluster
- Cloudinary account
- Razorpay account for payment functionality

## Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET_KEY=replace_with_a_secure_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_secure_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
DOLLAR_PRICE=90
```

Create `.env` files for both Vite applications. The backend URL should include the backend port:

`frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

`admin/.env`

```env
VITE_BACKEND_URL=http://localhost:4000
```

Do not commit environment files or payment, database, Cloudinary, or JWT secrets.

## Installation

Install dependencies separately because each application has its own `package.json`:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

## Running Locally

Start the backend:

```bash
cd backend
npm start
```

Start the patient frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Start the admin and doctor frontend in a third terminal:

```bash
cd admin
npm run dev
```

The applications are available at:

- Patient portal: http://localhost:5173
- Admin and doctor portal: http://localhost:5174
- API health check: http://localhost:4000/

## API Route Groups

- `/api/user` - registration, login, profiles, appointments, and payments
- `/api/admin` - admin authentication, doctor management, dashboard, and appointments
- `/api/doctor` - doctor authentication, profile, dashboard, availability, and appointments

## Useful Commands

Run these commands from the relevant project directory:

```bash
npm run dev      # Start a Vite development server (frontend/admin)
npm run build    # Create a production build (frontend/admin)
npm run lint     # Run the configured linter (frontend/admin)
npm start        # Start the backend with nodemon
```

## Notes

- The backend connects to the `prescripto` database name beneath the configured MongoDB URI.
- Doctor images are uploaded through Cloudinary.
- Appointment payment verification is handled through Razorpay.
- The backend does not currently include an automated test suite.
