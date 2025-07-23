# MyFacebook - MERN Full Stack Social Media App

MyFacebook is a full-stack social media web application inspired by Facebook, built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, sign in, create posts (with images/videos), view stories, manage their profile, and interact with other users.

## Features

- **User Authentication**: Register and sign in using email or mobile number and password.
- **Profile Management**: Update profile and cover pictures, view your posts and images.
- **News Feed**: View all users' posts, including text, images, and videos.
- **Create Posts**: Share text, images, or videos with other users.
- **Stories**: Upload and view temporary stories (images/videos).
- **Reels**: Watch short video content uploaded by users.
- **Friends List**: Browse all registered users.
- **Comments & Likes**: Interact with posts by liking and commenting.
- **Notifications & Settings**: Placeholder pages for future notification and settings features.

## Technologies Used

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer, GridFS
- **Authentication**: Passwords hashed with bcrypt
- **Media Storage**: Images and videos stored in MongoDB using GridFS

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB instance)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd myfacebook
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure MongoDB:**
   - Update the `mongoURL` in `src/backend/server.js` with your MongoDB connection string if needed.

4. **Start the backend server:**
   ```bash
   node src/backend/server.js
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000).

5. **Start the frontend React app:**
   ```bash
   npm start
   ```
   The frontend will run on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
myfacebook/
  ├── src/
  │   ├── backend/         # Express server, models, and API routes
  │   ├── components/      # React components (Posts, Stories, Profile, etc.)
  │   ├── pages/           # Main pages (Home, Profile, Signin, Registration, etc.)
  │   ├── Router/          # React Router setup
  │   └── index.js         # React entry point
  ├── public/              # Static assets
  ├── package.json         # Project metadata and dependencies
  └── README.md            # Project documentation
```

## API Endpoints (Backend)
- `POST /register` - Register a new user
- `POST /signin` - User login
- `POST /create-post` - Create a new post (with optional media)
- `GET /get-post` - Get all posts
- `GET /get-user-posts/:userId` - Get posts by a specific user
- `POST /upload-story` - Upload a new story
- `GET /get-stories` - Get all stories
- `GET /get-users` - Get all users
- `POST /update-profile-pic/:userId` - Update profile picture
- `POST /update-cover-pic/:userId` - Update cover photo
- `GET /media/:id` - Get media file (image/video)
- `GET /get-videos` - Get all video posts
- `POST /like-post` - Like/unlike a post
- `POST /add-comment` - Add a comment to a post

## Usage
- **Sign Up**: Create a new account with your details.
- **Sign In**: Log in to access your feed and features.
- **Create Post**: Share text, images, or videos from the homepage.
- **Stories**: Upload and view stories from the homepage.
- **Profile**: View and update your profile, see your posts and images.
- **Friends**: Browse all users from the friends page.
- **Reels**: Watch short videos uploaded by users.

## Customization
- Update MongoDB connection string in `src/backend/server.js` as needed.
- Tailwind CSS is used for styling; customize in `tailwind.config.js` and `index.css`.

## License
This project is licensed under the ISC License.

---
Inspired by Facebook. Built for learning and demonstration purposes.
