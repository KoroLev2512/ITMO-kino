![Image alt](https://github.com/KoroLev2512/ITMO-kino/blob/main/public/icons/logo_horizontal.webp)
# ITMO KINO: cinema tickets service

Service for the ITMO KINO project with the ability to register and select seats for the session.

## Features

- ITMO KINO landing page with registration
- Movie page with password access
- Session page and seat reservation with confirmation popup and complete popup
- Responsive design for mobile and desktop on all pages

## Getting Started

Make sure to install the dependencies:

```bash
npm install
```

## Production

Build the application for production:

```bash
npm run build
```

## Development server

Start the development server on `http://localhost:3000` and package-json server on `http://localhost:3001`:

```bash
npm start
```

## Package-json server only

Start only package-json server on `http://localhost:3001`:

```bash
npm run server
```

## Running Tests

```bash
npm test
```

To run tests with coverage:
```bash
npm test -- --coverage
```

## Pages
1. Home screen (Landing page)
2. Movie page (Info about movie with session list)
3. Session page (Hall scheme with seat selection)
4. Registration page (Page for registration without seat selection)

## Project Structure

The project is organized using a feature-sliced design:

```
itmokino/
├── public/               # Static assets
├── src/
│   ├── app/              # App-level utilities (styles, etc.)
│   ├── pages/            # Pages (Movie, Session, etc.)
│   ├── shared/           # Shared components, types, and utilities
│   └── widgets/          # Composite UI components
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Status

Today MVP of this project is available for users via link https://itmokino.ru

Work is underway on the online-reservation and admin panel.

## Learn More

To learn more about React, check out the following resources:

- [React Documentation](https://reactjs.org/docs/getting-started.html) - explore React's official docs.
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) - instructions to set up a React project with `react-scripts`.
- [SCSS Documentation](https://sass-lang.com/documentation) - learn about SCSS for styling.
- [JSON-Server Documentation](https://github.com/typicode/json-server) - see how to use JSON server.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


