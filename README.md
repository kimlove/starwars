# Ometria Frontend tech test

This project is also hosted at: https://starwars.kiml.dev

## Tech used

- Next.js 14 (mostly utilising React client side components for this task)
- TypeScript
- Tailwind
- React Query (API requests and client side caching)
- Jest with React Testing Library

Git commit messages follow the [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) guidelines.

## Local Quick Start

_Note: This assumes you have [Node.js](https://nodejs.org/en) installed._

1. **Clone this repository or [download the .zip file](https://github.com/kimlove/starwars/archive/refs/heads/main.zip):**

   `git clone https://github.com/kimlove/starwars.git`

2. **Install npm dependencies in the cloned folder:**

   `npm install`

### Start the Local Development Server

`npm run dev`

The development build of the task should be available at [http://localhost:3000/](http://localhost:3000/).

### Run the Production Build Locally

`npm run preview`

The production build of the task should be available at [http://localhost:3000/](http://localhost:3000/).

### Run the Jest Unit Tests

`npm test`

## Known Issues / Future Improvements

- **Loading Spinner**: A branded loading spinner would enhance user experience during API requests. _(todo)_
- **Navigation Improvements**: Enable navigation to the next or previous character from the detail view page to avoid returning to the homepage for each selection.
- **Image Handling**: Some images are missing on [Star Wars Visual Guide](https://starwars-visualguide.com/). Improved handling of 404 errors would prevent broken image displays.
- **Debounced Search Input**: Implement a debounce on the search input so the query fires only after a short delay in typing, reducing unnecessary API calls.
- **Additional Tests**: Some additional unit and integration tests would be beneficial.
- **Improved Linked Detail Display**: Some linked details (e.g., `/films/4/`) aren’t user-friendly and would be better represented with names (e.g., "The Phantom Menace"). Ideally, the API would return a name alongside the link, to avoid additional lookups.
- **Additional Data Display**: Easily extendable to include more data types (e.g., ships, vehicles) using the existing routing setup, though currently out of scope.
- **Animated Page Transitions**: Add smooth animated transitions between pages.
- **Optional Background Music**: Add optional Star Wars-themed background MIDI music to get into the Star Wars mood 😊
