

# Health Monitor Node

This project is a Node.js-based health monitoring system. It allows you to add patients, store their exercise data, and perform various operations using JWT authentication.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/your-username/health-monitor-node.git
    ```

2. Navigate to the project directory:
    ```sh
    cd health-monitor-node
    ```

3. Install the required npm packages:
    ```sh
    npm install
    ```

## Running the Server

1. Change to the `src` directory:
    ```sh
    cd src
    ```

2. Start the server using nodemon:
    ```sh
    nodemon server.js
    ```

## Loading Dummy Data

1. After adding a patient and obtaining the patient ID, you can load dummy data into the database.
2. Open the `insertData.js` file and add the patient ID and exercise type.
3. Run the script to insert the data:
    ```sh
    node insertData.js
    ```

## Generating a New JWT Secret

1. If you need to change the JWT secret, generate a new one using:
    ```sh
    node generateSecret.js
    ```

2. Update your environment variables or configuration with the new secret.

## Project Structure

- `src/`: Contains the main source code for the server.
- `src/server.js`: Main entry point for the server.
- `src/insertData.js`: Script to insert dummy data into the database.
- `src/generateSecret.js`: Script to generate a new JWT secret.

## Usage

### Adding a Patient

To add a patient, use the provided API endpoints (documentation for API endpoints can be added separately).

### Getting Patient ID

Once a patient is added, their ID will be returned. This ID is necessary for loading dummy data and performing other operations.

### Loading Dummy Data

Make sure to add the patient ID and exercise type in the `insertData.js` file before running the script to load dummy data.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file or your environment configuration:

- `JWT_SECRET`: Secret key for JWT authentication.



