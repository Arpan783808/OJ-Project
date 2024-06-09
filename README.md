# CODESTER-ONLINE JUDGE
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/56a3f109-f68d-4c6f-9774-e227192c232e" height="500" width="500" />

## Table of Contents

  1. Overview
  2. Features
  3. Technologies Used
  4. Prerequisites                                              
  5. Installation
  6. Backend
  7. Compiler
  8. Frontend
  9. Environment Variables
  10. Running the Project
  11. Local Development
  12. Docker Deployment
  13. Usage
  14. Contributing
  15. License




### OVERVIEW

This is a full-stack online judge platform built with the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to solve coding problems, submit solutions, and view results. It includes features such as user authentication, problem management, code compilation, and execution in an isolated environment .

### Features
1. User authentication with JWT.
2. Problem management (creation, editing, and deletion).
3. Code compilation and execution using a custom compiler.
4. Leaderboard for tracking user performance.


### Technologies Used

#### Frontend: React, Axios
<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/f234f9fa-ed17-4cb4-bdc9-60342e1e0bcd" width="100" height="100" />

#### Backend: Node.js, Express, MongoDB, Mongoose
<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/0f9c5307-3084-43fc-8350-771b83628b64" height="100" width="140"/>
<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/9f13bc0d-a06c-4309-a395-dbb9447f343e" height="100" width="140"/>
<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/6098952d-49c0-493f-9477-56c5848b5f88" height="100" width="100"/>

#### Compiler: Node.js, Docker
<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/b6a5412d-2a75-4b35-802f-840e79f9caf2" height="100" width="100" />

#### Authentication: JWT (JSON Web Token)
<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/529011b8-896c-48d6-9a4b-0259bfc50011" height="100" width="140"/>

#### Deployment: Docker, AWS EC2, MongoDB Atlas

<img src="https://github.com/Arpan783808/OJ-Project/assets/123624309/7ec551ef-f034-4cca-af2d-9df71af7b4c2" height="100" width="100" />

### Prerequisites
1. Node.js and npm installed on your machine
2. Docker and Docker Compose installed
3. MongoDB Atlas account

## Installation

### Backend
#### Clone the repository:

```git
git clone https://github.com/your-username/online-judge-backend.git
cd OJProject/backend
```

#### Install dependencies:
```git
npm install
```

### Compiler
#### Setup compiler:

```git
cd OJproject/compiler
```
#### Install dependencies:

```git
npm install
```

### Frontend
#### Setup frontend
```git
cd OJproject/frontend
```
 #### Install dependencies:
 ```git
npm install
```

## Environment Variables
### Create a .env file in the root of each repository (backend and compiler) and add the following variables:

#### Backend
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```
#### Compiler

REACT_APP_BACKEND_URL=backend_url
REACT_APP_COMPILER_URL=compiler_url

## Running the Project
### Local Development
#### Backend
##### Start the backend server:

```git
nodemon index.js
```

#### Compiler
##### Start the compiler server (this contains all the routes for compiling and judging code)

```git
nodemon compiler.js
```

#### Frontend
##### Start the frontend server

```git
npm start
```

## Docker Compose 
### Create a docker compose file outside your backend,compiler and frontend folders

```javascript
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - backend_port:backend_port  //port mapping
    depends_on:
      - mongodb
    environment:
      - MONGO_URI=your_mongo_uri

  compiler:
build: ./compiler
    ports:
      - compiler_port:compiler_port  //port mapping
    depends_on:
      - mongodb
    environment:
      - MONGO_URI=your_mongo_uri
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:

```

### Start all servers with a single docker compose command
```git
Docker-compose up -d
```

## Usage
1. User Registration and Login: Users can register and log in to the platform.
2. Problem Management: Admin users can create, edit, and delete problems.
3. Code Submission: Users can submit their code for problems, which will be compiled and executed.
4. Leaderboards: Users can view their rankings and performance.
5. Discussion Forum: Users can post questions and share their experiences.
6. Contests Information: Users can view upcoming and recent contests from Codeforces and LeetCode.


## Contributing
We welcome contributions from the community to enhance the Online Judge Platform. If you have ideas for new features, improvements, or bug fixes, follow these steps to contribute

1. Fork the Repository: Click the 'Fork' button at the top right of this repository to create your own copy.
2. Clone the Forked Repository: Clone your forked repository to your local machine using
```git
git clone https://github.com/your-username/online-judge-platform.git
```
3.git clone https://github.com/your-username/online-judge-platform.git
```git
git checkout -b branch_name
```
4. Make Changes: Implement your changes in the codebase.
5. Commit Your Changes: Commit your changes with a clear and descriptive commit message
```git
git commit -m "Add feature: your feature name"
```
6. Push to Your Fork: Push your changes to your forked repository
```git
 git push origin feature/your-feature-name
```
7. Submit a Pull Request: Open a pull request to the main repository with a description of your changes. Make sure to follow the pull request template provided

#### Before contributing, please ensure that your changes follow the project's coding standards and guidelines.
#### Thank you for your interest in contributing to the Online Judge Platform! 
