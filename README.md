# St. Angeloes College - React Website

A modern, responsive website for St. Angeloes College built with React.js and TailwindCSS.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 🌙 Dark mode support
- ⚡ Fast loading with optimized images
- 🎯 Semantic HTML structure
- ♿ Accessibility features
- 🚀 Ready for Vercel deployment

## Tech Stack

- **React 18** - Frontend framework
- **TailwindCSS** - Utility-first CSS framework
- **Material Symbols** - Icon library
- **Google Fonts** - Typography (Work Sans, Poppins, Roboto, Open Sans)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd st-angelos-college
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── index.js               # Application entry point
├── index.css              # Global styles with TailwindCSS
└── components/
    ├── Header.jsx         # Navigation and contact bar
    ├── Hero.jsx           # Hero section with background
    ├── FounderMessage.jsx # Founder's message section
    ├── Achievements.jsx   # Achievements and awards
    ├── NewsEvents.jsx     # News and announcements
    ├── Footer.jsx         # Footer with contact info
    └── Common/            # Reusable components
        ├── Button.jsx     # Custom button component
        ├── Card.jsx       # Card component
        └── SectionTitle.jsx # Section title component
```

## Customization

### Colors

The project uses custom colors defined in `tailwind.config.js`:

- **Royal Blue**: `#1a3e72`
- **White**: `#ffffff`
- **Gold**: `#d4af37`
- **Primary Purple**: `#6B21A8` (original)

### Fonts

The project includes multiple Google Fonts:
- Work Sans (primary)
- Poppins
- Roboto
- Open Sans

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

The project includes a `vercel.json` configuration file for optimal deployment.

### Other Platforms

The built files in the `build` folder can be deployed to any static hosting service like:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact:
- Email: info@stangeloslucknow.com
- Phone: +91-522-1234567
- Address: Vibutikhand, Gomti Nagar, Lucknow, UP 226010
