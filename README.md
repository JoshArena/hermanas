# Hermanes

A modern, beautiful website built with React, TypeScript, and Vite. Features a clean, responsive design with smooth animations and excellent user experience.

## Features

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Beautiful Design** - Modern UI with gradient accents and smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all device sizes
- 🔒 **Type Safe** - Built with TypeScript for better code quality
- 🚀 **Easy to Deploy** - Simple build process and deployment

## Tech Stack

- **React 19** - Latest version of React
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **CSS3** - Modern styling with CSS variables and animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
hermanes/
├── public/          # Static assets
├── src/
│   ├── App.tsx      # Main application component
│   ├── App.css      # Application styles
│   ├── index.css    # Global styles
│   └── main.tsx     # Application entry point
├── index.html       # HTML template
└── package.json     # Dependencies and scripts
```

## Customization

### Colors

Edit the CSS variables in `src/index.css` to customize the color scheme:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* ... other variables */
}
```

### Content

Modify the content in `src/App.tsx` to update the website text, features, and sections.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
