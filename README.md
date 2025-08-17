# ⚡ Task Matrix - Retro Neon Task Management

A modern task management application built with React, TypeScript, and Vite featuring a stunning retro 80's cyberpunk aesthetic.

![Task Matrix](https://img.shields.io/badge/Style-Retro%20Neon%2080's-ff00ff?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- **🎯 Full CRUD Operations**: Create, read, update, and delete tasks
- **🔐 Auth0 Authentication**: Secure user authentication and authorization
- **🎨 Retro Cyberpunk UI**: 80's neon aesthetic with animated elements
- **📱 Responsive Design**: Works on desktop and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development
- **🔒 Type Safety**: Full TypeScript integration throughout

## 🎮 Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Custom CSS with retro neon theme
- **Authentication**: Auth0
- **Form Handling**: Formik + Yup validation
- **Routing**: React Router DOM
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DanielBarletta81/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Auth0**
   - Create account at [auth0.com](https://auth0.com)
   - Create a Single Page Application
   - Set callback URLs to `http://localhost:5173/dashboard`
   - Set logout URLs to `http://localhost:5173`

4. **Environment Setup**
   Create `.env` file:
   ```env
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173` to see your app!

## 🎨 Design Features

- **Animated Grid Background**: Moving cyberpunk grid pattern
- **Double Border Animation**: Pulsing light effect at the top
- **Glass Morphism Cards**: Translucent task cards
- **Neon Color Palette**: Cyan, pink, green, purple accents
- **Orbitron Font**: Futuristic typography
- **Celestial Hover Effects**: Star Wars-inspired button animations

## 📁 Project Structure

```
src/
├── Auth/                 # Authentication components
├── Tasks/               # Task-related components  
├── components/          # Reusable UI components
├── context/            # React Context providers
├── types/              # TypeScript type definitions
├── App.tsx             # Main application
├── main.tsx            # Vite entry point
└── index.css           # Global retro styling
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

- **TaskList**: Dashboard with grid layout of tasks
- **TaskForm**: Create/edit tasks with validation
- **TaskDetail**: Individual task view with actions
- **LoginPage**: Auth0 authentication interface
- **PrivateRoute**: Protected route wrapper

## 📝 Task Properties

Each task includes:
- Title and description
- Status: `todo` | `in-progress` | `completed`
- Priority: `low` | `medium` | `high`
- Creation and update timestamps
- User association

## 🎯 Future Enhancements

- Real-time updates with WebSockets
- Task categories and tags
- Due date management
- Team collaboration features
- Mobile app version

## 📄 License

MIT License - feel free to use this project as a foundation for your own applications!

---

*Built with ⚡🦁🇮🇹⚫⚪ by [DanielBarletta81](https://github.com/DanielBarletta81)*
