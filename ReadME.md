# Notification Service

## Description
Pearl Thoughts is a Node.js application built with Express and TypeORM. It provides a notification service using AWS SES and Nodemailer.

## Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
1. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    PORT=3000
    DATABASE_URL=<your-database-url>
    AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
    AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
    ```
2. Start the server:
    ```bash
    npm start
    ```
3. The server will be running on `http://localhost:3000`.

## Environment Variables
- `PORT`: The port on which the server will run (default is 3000).
- `DATABASE_URL`: The URL of the database to connect to.
- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

## Scripts
- `start`: Starts the server using Nodemon.
- `test`: Runs the tests using Jest.
- `typeorm`: Runs TypeORM commands.

## Dependencies
- `@aws-sdk/client-ses`: AWS SDK for SES.
- `body-parser`: Middleware to parse request bodies.
- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Web framework for Node.js.
- `mysql2`: MySQL client for Node.js.
- `nodemailer`: Module to send emails.
- `nodemon`: Utility to automatically restart the server.
- `reflect-metadata`: Metadata reflection API.
- `typeorm`: ORM for TypeScript and JavaScript.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the ISC License.
