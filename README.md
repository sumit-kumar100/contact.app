# Contact App

Welcome to the Contact App repository! This app allows you to manage contacts and their address details, with features like server-side pagination and filtering. The backend is built using Node.js and Express.js, with a PostgreSQL database. This guide will help you set up and use the app.

## Features

- Create, read, update, and delete contacts
- Store address details for each contact
- Server-side pagination for efficient data retrieval
- Server-side filtering to find specific contacts
- Swagger documentation available at http://localhost:8080/api-docs/
- A folder with a simple JavaScript logic assignment

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - PostgreSQL

- Frontend:
  - React/Next.js

## Setup

### Backend Setup

1. Make sure you have Node.js and PostgreSQL installed on your system.  
2. Clone this repository.
   ```bash
   git clone https://github.com/sumit-singh1196/contact.app
3. Change to the backend directory.
   ```bash
   cd contact-app-backend  
4. Install the required Node.js packages.
   ```bash
    npm install
5. Create a fresh database named contact-app-dev.
   ```bash
    npm run db:reset
6. Start the server.
   ```bash
    npm run start:dev

The server will run on port 8080, and you can access the Swagger documentation at http://localhost:8080/api-docs/

### Frontend Setup

1. Change to the frontend directory.
   ```bash
   cd contact-app-frontend  
2. Install the required Node.js packages.
   ```bash
    yarn install
    # OR
    npm install
3. Start the server.
   ```bash
    yarn preview
    # OR
    npm run preview

The frontend will be accessible at http://localhost:3001

## Preview Images

<img src="contact-app-previews/preview-0.png" width="800" height="465">
<img src="contact-app-previews/preview-1.png" width="800" height="465">
<img src="contact-app-previews/preview-2.png" width="800" height="465">
<img src="contact-app-previews/preview-3.png" width="800" height="465">
<img src="contact-app-previews/preview-4.png" width="800" height="465">

## Usage
You can now use the Contact App to manage your contacts, perform CRUD operations, and utilize server-side pagination and filtering. Feel free to explore the Swagger documentation for available endpoints and try them out.

## Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request to merge your changes into the main repository.

##License
This project is licensed under the [contact-app-license] License - see the LICENSE.md file for details.

Thank you for using the Contact App!
