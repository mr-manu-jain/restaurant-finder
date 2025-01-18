<div id="top"></div>
<br/>
<p align="center">
  <a href="https://github.com/mr-manu-jain/restaurant-finder" title="FineDine: A Restaurant Finder Application">
    <img src="./wireframes/artifacts/FineDine_Short.png" width="80px" alt="Restaurant Finder"/>
  </a>
  </p>
<h1 align="center"><span>FineDine: A Restaurant Finder Application </h1>
 
## About

This project involves developing an application called FineDine: An end-to-end RestaurantFinder application.
<p align="right">(<a href="#top">👆🏻</a>)</p>

## Features

1.	**User Interface:** This component represents the web or mobile UI that users, business owners, and admins interact with. (Using react app)
2.	**API Gateway:** Acts as the entry point for all API requests, handling authentication and routing
3.	**User Management:** Handles user registration, login, and role-based access control for users, business owners, and admins (Azure B2C)
4.	**Restaurant Search:** Manages search functionality, including filtering by name, category, cuisine type, price range, and ratings 
5.	**Review & Rating:** Handles submission and retrieval of reviews and ratings for restaurants
6.	**Business Management:** Allows business owners to add new listings, update information, and manage their restaurant profiles
7.	**Admin Functions:** Provides functionality for admins to check for duplicate listings and remove entries
8.	**Database:** Stores all application data, including user information, restaurant details, reviews, and ratings (MongoDB)
9.	**External Map API:** Integrates with an external mapping service to provide location-based search functionality
<p align="right">(<a href="#top">👆🏻</a>)</p>

## Use Case of Application

<p align="center" title="Restaurant Finder use case"><img src="./UseCase_Diagram.jpg" alt="Restaurant Finder Use case"/></p>
<p align="right">(<a href="#top">👆🏻</a>)</p>

## Functional Requirements

<p align="center" title="Restaurant Finder Requirements"><img src="./FunctionalReq_Diagram.jpg" alt="Restaurant Finder Functional Requirements"/></p>
<p align="right">(<a href="#top">👆🏻</a>)</p>

## Tech Stack

- **Front-end:** React js, React Hooks Tailwind CSS, Javascript (ES6+)
- **Back-end:** Spring boot 
- **Database:** MongoDB
- **Authentication and Authorization:** Azure B2C 
- **Deployment and Testing:** AWS Elastic Beanstalk 
- **Google Places API**
<p align="right">(<a href="#top">👆🏻</a>)</p>

## Technical Summary & Architecture

<p align="center" title="Restaurant Finder Architecture"><img src="./Architecture_Diagram.jpg" alt="Restaurant Finder Architecture Diagram"/></p>
<p align="right">(<a href="#top">👆🏻</a>)</p>

## Database Schema 

<p align="center" title="Restaurant Finder Schema"><img src="./DBSchema_Final.png" alt="Restaurant Finder Schema"/></p>
<p align="right">(<a href="#top">👆🏻</a>)</p>

## UML Class Diagram

<p align="center" title="Restaurant Finder UML"><img src="./UML_Class_Diagram.jpg" alt="Restaurant Finder UML"/></p>
<p align="right">(<a href="#top">👆🏻</a>)</p>

## UI Wireframes - Using Figma

**Login Page**
<p align="center" title="UI Wireframe"><img src="./wireframes/Sign Up Page.png" alt="Login Page"/></p>

**Landing Page / Zipcode search**
<p align="center" title="UI Wireframe"><img src="./wireframes/Home Page.png" alt="Home page"/></p>

**Restaurant Search Page**
<p align="center" title="UI Wireframe"><img src="./wireframes/Search Page.png" alt="Search page"/></p>

**Restaurant Home Page**
<p align="center" title="UI Wireframe"><img src="./wireframes/Restaurant Landing Page.png" alt="Restaurant Home Page"/></p>

**About Page**
<p align="center" title="UI Wireframe"><img src="./wireframes/Team.png" alt="About Page"/></p>

<p align="right">(<a href="#top">👆🏻</a>)</p>

---
## Running the Application 
---

This repository contains two applications:

**React Frontend**: Located in the react-app-finedine/ folder, it serves the client-side user interface.

**Spring Boot Backend**: Located in the springboot-app-finedine/ folder, it serves the server-side API and business logic.


### Prerequisites

Ensure the following are installed on your machine:

#### For React Frontend:
- Node.js: (Recommended version: LTS)
- A package manager: npm (default with Node.js) or yarn.

#### For Spring Boot Backend:
- Java Development Kit (JDK): Version 8 or higher.
- Apache Maven.

#### Optional:
- Git for cloning the repository.

-----------
### Steps:

**1.⁠ ⁠Clone the Repository**

Clone the repository to your local machine:
    `git clone <repository-url>`
    `cd <repository-folder>`

**2.⁠ ⁠Running the React Frontend**
Navigate to the react-app-finedine/ directory:
`cd react-app-finedine`

##### Install dependencies:

**Using npm:** `npm install`
**Using yarn:** `yarn install`

##### Start the development server:

**Using npm:** `npm start`
**Using yarn:** `yarn start`

*The React application will run on http://localhost:3000 by default.*

**3.⁠ ⁠Running the Spring Boot Backend**
***Navigate to the backend/ directory:*** `cd springboot-app-finedine`

###### Build the application:
Run the following command to clean and install dependencies:

`mvn clean install`

###### Start the Spring Boot application:
Using Maven: `mvn spring-boot:run`

***The backend application will run on http://localhost:8080 by default.***

-----------

**4. Running Both Applications Together**

To run the React frontend and Spring Boot backend simultaneously:

Open two terminal windows or tabs.

##### In the first terminal:
Navigate to the react-app-finedine/ directory and start the React application.

##### In the second terminal:
Navigate to the springboot-app-finedine/ directory and start the Spring Boot application.

**Ensure the frontend makes API calls to the correct backend URL. Update the React app's .env file or configuration to use the backend API, e.g.:**

`REACT_APP_API_URL=http://localhost:8080
`
<p align="right">(<a href="#top">👆🏻</a>)</p>