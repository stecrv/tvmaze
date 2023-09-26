# MovieFinder

This project is an exploration for vue3. 

This project required 4 days for learning vue3 with the use of official documentation and the help of AI for learning.

## Requirement
use the latest npm (8.19) or yarn (1.22)

## How to run
from the project root, open a terminal
- `yarn install` or `npm install`
- `yarn dev` or `npm run dev`
- open the url in the terminal in your browser

# Architectural choice
- Vue 3 has been used as the latest version, with composition API to reduce complexity
- Every component has his how file, for code splitting.
- vue-router has been used has official library for routing 
- There are only 2 routes, one for the home page and one to show a movie details.
- I did some research for state manager and i look at pinia for the most promising candidate. 
- However, I did not use any state manager because the app is very simple
- Composable has been used to simplify some repetitive code
- Node has not been used, the app is quite simple to run using only yarn dev
- To help with style I use barebone style template called skeletron 
- A search has been added, and also a genre selector to filter the content
- TV maze is the API BE