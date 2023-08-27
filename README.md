# Klontong, the fullstack project.

## Installation

Navigate to the client folder:

```
cd client
```

Run the setup script:

```
./setup.sh
```

This will install the necessary dependencies for the client-side of the application and run the application.

Navigate to the server folder:

```
cd ../server
```

### Option 1: Use Docker (Recommended if you don't have MongoDB installed locally)

If you have Docker and Docker Compose installed, run the following command:

```
cp .env.example .env
docker-compose up
```

### Option 2: Use Local MongoDB (If you have MongoDB installed locally)

If you already have MongoDB installed and running locally, run the server setup script:

```
./setup.sh
```

This will install the necessary dependencies for the server-side of the application, run the seeder file, and run the server-side application.

## Usage

Access the client application in your browser at http://localhost:3000.

The seeded user's credentials:

    Email: bobby@gmail.com
    Password: password123
