# Task Manager - CRUD Application

A fully functional CRUD (Create, Read, Update, Delete) application built with Next.js, React, and Tailwind CSS. This application demonstrates all four CRUD operations with persistent data storage, real-time notifications, and a modern user interface.

## 🚀 Features

### Core CRUD Operations
- **CREATE**: Add new tasks with title, description, and priority levels
- **READ**: View, filter, and search through tasks
- **UPDATE**: Edit existing tasks and toggle completion status
- **DELETE**: Remove individual tasks or clear all tasks

### Advanced Features
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💾 Persistent Storage**: All data automatically saved to browser localStorage
- **🔔 Real-time Notifications**: Toast notifications for all user actions
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **⚡ Real-time Updates**: Instant UI updates without page refreshes
- **🔍 Task Filtering**: Filter tasks by status (All, Pending, Completed)
- **🏷️ Priority System**: Color-coded priority levels (High, Medium, Low)
- **✨ Smooth Animations**: Elegant transitions and hover effects

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.5.2
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Storage**: Browser localStorage
- **Icons**: Unicode symbols and emojis
- **Animations**: CSS transitions and keyframes

## 📦 Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd crud-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage Guide

### Creating Tasks
1. Fill out the "Add New Task" form at the top of the page
2. Enter a task title (required)
3. Add an optional description
4. Select a priority level (Low, Medium, High)
5. Click "Add Task" to create the task

### Managing Tasks
- **View Tasks**: All tasks are displayed in the main list
- **Filter Tasks**: Use the filter buttons to view All, Pending, or Completed tasks
- **Edit Tasks**: Click the "Edit" button on any task to modify it
- **Complete Tasks**: Check the checkbox to mark tasks as completed
- **Delete Tasks**: Click the "Delete" button to remove individual tasks
- **Clear All**: Use the "Clear All Tasks" button to remove all tasks

### Notifications
The application provides real-time feedback through toast notifications:
- **✅ Success** (Green): Task creation and updates
- **ℹ️ Info** (Blue): Task completion status changes
- **⚠️ Warning** (Orange): Task deletions
- **❌ Error** (Red): Storage or system errors

## 📁 Project Structure

```
crud-app/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.js            # Root layout component
│   └── page.js              # Main application component
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── jsconfig.json            # JavaScript configuration
└── README.md                # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server

## 💾 Data Storage

The application uses browser localStorage for data persistence:
- **Automatic Saving**: All changes are saved immediately
- **Cross-Session**: Data persists between browser sessions
- **Error Handling**: Graceful fallback if storage is unavailable
- **Data Format**: JSON serialization for complex data structures

### Storage Key
- **Key**: `crud-app-tasks`
- **Format**: JSON array of task objects
- **Structure**: 
  ```json
  [
    {
      "id": 1234567890,
      "title": "Task Title",
      "description": "Task Description",
      "completed": false,
      "priority": "medium"
    }
  ]
  ```

## 🎨 UI Components

### Task Card
- Checkbox for completion status
- Task title and description
- Priority badge with color coding
- Edit and Delete action buttons

### Form Elements
- Text input for task titles
- Textarea for descriptions
- Select dropdown for priority levels
- Submit and cancel buttons

### Filter Controls
- Toggle buttons for different views
- Task counter display
- Clear all functionality

## 🔄 State Management

The application uses React's built-in state management:
- **useState**: For component state
- **useEffect**: For side effects and localStorage integration
- **Local State**: All data managed within the main component

## 🎭 Animation Details

### Notification Animations
- **Slide-in**: Notifications slide in from the right
- **Auto-dismiss**: Notifications disappear after 3 seconds
- **Manual dismiss**: Click the X button to close early

### UI Transitions
- **Hover effects**: Button and card hover states
- **Color transitions**: Smooth color changes
- **Loading states**: Visual feedback during operations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔒 Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile browsers**: Full responsive support

## 🐛 Troubleshooting

### Common Issues

1. **Tasks not saving**
   - Check if localStorage is enabled in your browser
   - Ensure you're not in private/incognito mode

2. **Development server won't start**
   - Make sure Node.js is installed
   - Run `npm install` to install dependencies
   - Check for port conflicts (default: 3000)

3. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Check if PostCSS is working correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and symbols from Unicode
- Inspired by modern task management applications

## 📞 Support

If you have any questions or need help with the application:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the code comments for implementation details

---

**Happy Task Managing! 🎉**