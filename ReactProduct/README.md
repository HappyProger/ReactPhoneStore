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

To run the full application, you need to start both the backend server and the frontend development server.

### Prerequisites

Make sure you have Node.js and npm installed on your computer.

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm: Node.js installation usually includes npm.

### Backend Setup and Running

1.  Navigate to the backend directory (assuming it's named `back`):

    ```bash
    cd ../back
    ```

2.  Install the backend dependencies:

    ```bash
    npm install
    ```

3.  Start the backend server:

    ```bash
    npm run dev
    ```

    The backend should start, typically on port 5000 (as configured in `src/services/api.ts`).

### Frontend Setup and Running

1.  Navigate to the frontend project directory:

    ```bash
    cd ReactProduct
    ```

2.  Install the frontend dependencies:

    ```bash
    npm install
    ```

3.  Run the frontend development server:

    ```bash
    npm run dev
    ```

    This will start a local development server for the frontend, usually at `http://localhost:5173`. The console output will show the exact address.

**Note:** The application requires both the backend and frontend servers to be running simultaneously.

### Building for Production

To build the frontend application for production deployment:

```bash
npm run build
```

This command will create a `dist` folder in the `ReactProduct` directory with the optimized production build.

### Project Structure

The main frontend project files are located in the `src` directory:

- `src/App.tsx`: Main application component and routing setup.
- `src/index.css`: Global styles.
- `src/main.tsx`: Entry point of the application.
- `src/components/`: Reusable React components.
- `src/pages/`: Page components (e.g., catalog, details, home).
- `src/context/`: React Context for state management (e.g., Cart, Notification).
- `src/services/api.ts`: API service for fetching data.
- `src/types/`: TypeScript type definitions.

Feel free to explore the code and make modifications.
