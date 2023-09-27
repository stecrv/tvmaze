# MovieFinder

**MovieFinder** is a web application designed to search for movies on the web. It serves as a hands-on exploration into the Vue 3 framework.

The development journey involved four days of Vue 3 learning, utilizing the official documentation and AI assistance.

## Requirements
- Use npm version 8.19 or yarn version 1.22.

## How to Run
1. Navigate to the project root in your terminal.
2. Run `yarn install` or `npm install`.
3. Start the development server with `yarn dev` or `npm run dev`.
4. Open the displayed URL in your browser.

## Architectural Choices
- Leveraged **Vue 3**, the latest version, utilizing its composition API to streamline complexity.
- Each component is isolated in its own file to facilitate code splitting.
- Employed `vue-router` as the primary library for routing.
- The app features two routes: a homepage and a movie details page.
- While pinia emerged as a potential state manager during research, no state manager was used due to the app's simplicity.
- Utilized Composables to reduce redundancy in code.
- The app doesn't rely on Node; it can be easily run with just `yarn dev`.
- Incorporated a minimalist style template, **skeletron**, to enhance aesthetics.
- Features include a search function and a genre selector for content filtering.
- **TV Maze** serves as the backend API.

## Upcoming Enhancements
- Introduce a version integrated with pinia.
- Roll out a Docker-supported version.
