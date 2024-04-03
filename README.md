# React Social Media App (Rungta Connect)

This is a simple social media application built using React.js. It allows users to post updates, view posts from other users, and interact with them through likes and comments.

## Features

- **User Authentication**: Users can sign up and log in to their accounts securely.
- **Posting**: Logged-in users can create new posts with text and optional links.
- **Feed**: The main feed displays posts from all users in chronological order.
- **Likes and Comments**: Users can like posts and leave comments on them.
- **Profile**: Each user has their own profile with basic information.

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Firebase**: Backend service used for user authentication and database storage (Firestore).
- **React Router**: Library for handling routing within the application.
- **PropTypes**: Library for typechecking React props.
- **CSS**: Stylesheets for styling the components.

## Installation

1. Clone the repository:

https://github.com/jzedee/rungta-connect.git


2. Install dependencies:

cd rungta-connect
npm install


3. Set up Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Firestore database and authentication (email/password)
   - Copy your Firebase configuration object and replace it in `src/firebase/firebase.js`

4. Start the development server:

npm start


5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

To deploy the app, run:

npm run build


This will create a production build of the app in the `build` directory. You can then deploy this build to a hosting service of your choice (e.g., Firebase Hosting, Netlify, Vercel).

## License

This project is open to contribute
