# GameVault

CodePath WEB103 Final Project  
Designed and developed by: [Naiya Patel, Kelly Yu, Noor Al Azzawi]

🔗 Link to deployed app:

## About

### Description and Purpose

GameVault is a full-stack web app that allows users to track and organize inventory items from any video game in one place. Users can create games, add and manage items, and build custom loadouts or collections using gear from different games. The purpose of the app is to help players and collectors keep their inventories organized, compare their gear, and manage builds more easily across multiple titles.

### Inspiration

We were inspired by how many games have large and complex inventory systems, but most tools only support one game at a time or focus on full game libraries instead of item management.[web:34][web:31] We wanted to build a flexible inventory tracker that works for any type of game, including RPGs, shooters, and collection-based games. We also drew inspiration from common inventory system ideas such as sorting, filtering, and detailed item organization, which are frequently discussed as core features of strong inventory experiences.[web:18][web:38]

## Tech Stack

### Frontend:
- React
- React Router
- CSS
- JavaScript

### Backend:
- Node.js
- Express
- PostgreSQL

## Features

### Game Library

Users can add games to their personal library and open a dedicated inventory page for each game.

[gif goes here]

### Item Management

Users can create, view, edit, and delete inventory items with details such as item name, type, rarity, quantity, and stats.[web:18][web:38]

[gif goes here]

### Universal Loadouts

Users can create custom loadouts or collections and add items to them in order to organize builds, favorite gear sets, or themed inventories.

[gif goes here]

### Filters and Sorting

Users can filter items by game, type, and rarity, and sort them by name, power, or date added to find items more quickly.[web:18]

[gif goes here]

### Starter Inventory Generator

When a user creates a new game entry, the app automatically generates a small starter inventory so the user begins with example content instead of an empty page.[web:33]

[gif goes here]

### Inventory Detail Modal

Users can click on an item to open a modal that displays more details and allows quick edits without leaving the current page.

[gif goes here]

### Item Validation

The app validates user input before saving item data, such as requiring an item name and preventing invalid quantities or stat values from being stored.[web:32]

[gif goes here]

### Error Handling

The app gracefully handles errors by showing user-friendly feedback when actions fail, forms are invalid, or requested data cannot be loaded.[web:32]

[gif goes here]

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone [your-repo-link]
   ```

2. Move into the project folder:
   ```bash
   cd [your-repo-name]
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

4. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

5. Set up environment variables for the server, including your PostgreSQL database connection.

6. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

7. Start the frontend app:
   ```bash
   cd client
   npm run dev
   ```

8. Open the local development URL shown in the terminal to view the app.