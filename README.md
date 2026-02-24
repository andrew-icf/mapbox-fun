# Mapbox Drawing Application

A React + TypeScript application for creating, managing, and persisting map drawings using Mapbox GL JS. Draw polygons and lines on an interactive map, customize colors, calculate areas, and save your work locally.

## Features

- 🗺️ Interactive map powered by Mapbox GL JS
- ✏️ Draw polygons and lines with custom colors
- 📏 Real-time area calculation for polygons
- 🎨 Individual color customization per drawing (line and fill)
- 💾 Persistent storage using localStorage
- 🗑️ Delete individual drawings or clear all at once
- 📋 Drawing list with metadata display

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)
- A [Mapbox account](https://account.mapbox.com/auth/signup/) and access token

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Mapbox access token

1. The provided access token is the default public token provided by Mapbox. There should be no need to generate a new token. However if that is not the case follow the below steps.
2. Sign up for a free Mapbox account at [mapbox.com](https://account.mapbox.com/auth/signup/)
3. Get your access token from your [Mapbox account dashboard](https://account.mapbox.com/access-tokens/)
4. Open `src/components/Map.tsx` and replace the placeholder token:
```typescript
const token = 'YOUR_MAPBOX_TOKEN_HERE';
```

> **Note:** For production, consider using environment variables instead of hardcoding the token.

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
```

The application will open at `http://localhost:5173`

## Usage

1. **Draw on the map:**
   - Use the drawing tools on the left side of the map
   - Select polygon or line tool
   - Click on the map to create points
   - Double-click or press Enter to finish drawing

2. **Customize colors:**
   - Use the color pickers in the bottom-left panel
   - Line Color: Changes the stroke color
   - Fill Color: Changes the polygon fill color
   - Colors are applied to new drawings

3. **Manage drawings:**
   - View all drawings in the list below the map
   - Click "Delete" to remove individual drawings
   - Click "Clear Drawing List" to remove all drawings
   - Drawings persist across page reloads

4. **Calculate area:**
   - For polygons, the area in square meters is displayed automatically
   - Area updates when you edit or delete drawings


## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mapbox GL JS** - Interactive maps
- **@mapbox/mapbox-gl-draw** - Drawing tools
- **@turf/turf** - Geospatial analysis (area calculation)


## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Troubleshooting

**Map not loading:**
- Check that your Mapbox access token is correct
- Ensure you have an internet connection
- Check the browser console for errors

**Drawings not persisting:**
- Check that localStorage is enabled in your browser
- Clear browser cache and try again

**Infinite render loop:**
- Make sure you're using the latest version of the code
- Check that dependencies are correctly installed

## Support

For issues or questions, please open an issue on GitHub.