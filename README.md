# Menu Management System

This is a **Menu Management System** built using **Nest.js** for the backend and **Next.js** for the frontend. The system allows users to create, update, delete, and view hierarchical menus.

## Features
- Fetch all menus
- Get a specific menu with depth and root item
- Display hierarchical menu structure
- Add menu items with parent-child relationships
- Update menu items
- Delete menu items (soft delete)
- Save menus

## Tech Stack
### Frontend:
- **Next.js 14**
- **App Router**
- **API Routes (route handlers)**
- **Redux**
- **TailwindCSS**

### Backend:
- **Nest.js**
- **PostgreSQL**
- **Prisma.js**
- **Well-structured modular folder organization**

## Project URLs
- **Frontend**: [Menu Management UI](https://menu-ruby.vercel.app/)
- **Backend API**: [Menu Management API](https://menumangement-production.up.railway.app/api)

## API Endpoints
### Base URL: `https://menumangement-production.up.railway.app/api`

#### Menu Endpoints
- **Create a menu**: `POST /menus`
- **Get all menus**: `GET /menus`
- **Get menu by ID**: `GET /menus/menu/{id}`
- **Update a menu**: `PUT /menus/{id}`
- **Soft delete a menu**: `DELETE /menus/{id}`

## Installation & Setup
### Backend Setup
1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the database using PostgreSQL and Prisma
4. Run the server:
   ```sh
   npm run start
   ```

### Frontend Setup
1. Clone the frontend repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

## Deployment
- **Frontend** deployed on Vercel
- **Backend** deployed on Railway


