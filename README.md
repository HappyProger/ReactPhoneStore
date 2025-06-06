# React Phone Store

This is a simple e-commerce application built with React, focusing on phone products.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- react-toastify (for notifications)
- react-beautiful-dnd (for drag and drop in Cart - **Note:** May have compatibility issues with React 18 Strict Mode)
- vite (as the build tool)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed on your computer.

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm: Node.js installation usually includes npm.

### Installation

1.  Navigate to the project directory in your terminal.

    ```bash
    cd ReactProduct
    ```

2.  Install the project dependencies:

    ```bash
    npm install
    ```

### Running the Project

To run the project in development mode:

```bash
npm run dev
```

This will start a local development server, usually at `http://localhost:5173`. The console output will show the exact address. The application will automatically reload when you make changes to the code.

### Building for Production

To build the application for production deployment:

```bash
npm run build
```

This command will create a `dist` folder in the project root with the optimized production build.

### Project Structure

The main project files are located in the `src` directory:

- `src/App.tsx`: Main application component and routing setup.
- `src/index.css`: Global styles.
- `src/main.tsx`: Entry point of the application.
- `src/components/`: Reusable React components.
- `src/pages/`: Page components (e.g., catalog, details, home).
- `src/context/`: React Context for state management (e.g., Cart, Notification).
- `src/services/api.ts`: API service for fetching data.
- `src/types/`: TypeScript type definitions.

Feel free to explore the code and make modifications.
