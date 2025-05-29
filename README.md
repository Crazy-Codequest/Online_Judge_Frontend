# Online Judge Frontend

A modern, responsive web application for an online coding platform built with React and Material-UI. This frontend provides a user-friendly interface for coding challenges, competitions, and learning resources.

## Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online_Judge-4CAF50?style=for-the-badge)](http://crazy-codequest.netlify.app/)

## Features

- **Code Editor**: Built-in code editor with syntax highlighting
- **Multiple Languages**: Support for various programming languages
- **Real-time Execution**: Execute code and see results instantly
- **User Authentication**: Secure login and registration
- **Problem Solving**: Browse and solve coding problems
- **Competitions**: Participate in coding competitions
- **Leaderboards**: Track your progress and ranking
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React 18
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Code Editor**: Monaco Editor (VS Code)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Form Handling**: Formik & Yup
- **Styling**: CSS-in-JS with Emotion
- **Icons**: Material Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Online_Judge_Frontend/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```env
   # Google OAuth (optional)
   # REACT_APP_GOOGLE_ID='your_google_client_id'
   # REACT_APP_GOOGLE_SECRET='your_google_client_secret'
   
   # EmailJS Configuration
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   
   # API Configuration
   REACT_APP_API_BASE_URL=https://server-thrumming-waterfall-7530.fly.dev/api
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images, fonts, and other static assets
│   ├── components/         # Reusable UI components
│   ├── features/           # Feature-based modules
│   │   ├── auth/          # Authentication
│   │   ├── problems/      # Problem solving
│   │   ├── competitions/  # Competitions
│   │   └── profile/       # User profile
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── store/             # Redux store
│   ├── styles/            # Global styles
│   ├── utils/             # Utility functions
│   ├── App.js             # Main App component
│   └── index.js           # Application entry point
├── .env                   # Environment variables
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Available Scripts

- `npm start` or `yarn start` - Start the development server
- `npm test` or `yarn test` - Run tests
- `npm run build` or `yarn build` - Build for production
- `npm run eject` or `yarn eject` - Eject from create-react-app

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_BASE_URL` | Base URL for the API | Yes |
| `REACT_APP_EMAILJS_SERVICE_ID` | EmailJS service ID for sending emails | Yes |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | EmailJS template ID for email templates | Yes |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | EmailJS public key | Yes |
| `REACT_APP_GOOGLE_ID` | Google OAuth client ID (optional) | No |
| `REACT_APP_GOOGLE_SECRET` | Google OAuth client secret (optional) | No |

## Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

### Deploying to Netlify

1. Push your code to a Git repository
2. Connect the repository to Netlify
3. Set up the build settings:
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `build`
4. Add environment variables in the Netlify dashboard
5. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the repository or contact the development team.

## Acknowledgments

- [Material-UI](https://mui.com/) for the awesome React UI components
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React Router](https://reactrouter.com/) for routing

---

Made with ❤️ by the Crazy Codequest Team
