# Product Management Application

This is a product management application built with a React.js frontend and a Node.js backend. The application allows users to view, add, update, and delete products, as well as search for products by name or description.

## Prerequisites

Before running the application, ensure that you have the following software installed:

- Node.js (version 12 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:GonzoTheDev/Enterprise-App-Dev-CA.git
   ```

2. Install the dependencies for the backend:

    ```bash
    cd backend
    npm install
    ```

3. Install the dependencies for the frontend:

    ```bash
    cd ../frontend
    npm install
    ```

## Running the applciation

1. Start the backend server:

    ```bash
    cd backend
    node src
    ```
The backend server will start running on http://localhost:3001.

2. In a new terminal window/tab, start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```
The frontend application will open in your default web browser at http://localhost:3000.


## Usage
Once the application is running, you can:

View the list of products
Search for products by name or description
Add a new product
Update an existing product
Delete a product

## Project Structure
backend/: Contains the Node.js backend code
frontend/: Contains the React.js frontend code

## Dependencies
The main dependencies used in this project are:

### Backend
Express.js
MongoDB (in-memory)
Cors
Helmet
Morgan
Body-Parser

### Frontend
React.js
React Router
React Bootstrap
Axios
Styled Components

## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.