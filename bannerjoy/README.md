# Bannerjoy

Bannerjoy is a modernized rewrite of the Bannertime generator example project built on Gulp 4. It provides a clean, dependency-light starter kit for HTML5 banners that compile Sass, transpile JavaScript with Babel, optimize assets, and serve live previews with BrowserSync.

## Features

- **Gulp 4** task runner with fast, parallelized builds.
- **Sass** compilation with Autoprefixer and optional production minification.
- **Babel**-transpiled ES2015+ JavaScript with optional Terser minification.
- **Image optimization** for production builds.
- **Live reloading** development server powered by BrowserSync.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server with live reload:
   ```bash
   npm run dev
   ```
3. Create an optimized production build:
   ```bash
   npm run build
   ```

### Installation troubleshooting

If `npm install` fails with a 403 registry error, ensure your environment can reach https://registry.npmjs.org/ without corporate or proxy blocks, or configure npm to use an accessible mirror. All build scripts depend on the packages listed in `package.json` being installed successfully.

## Project structure

```
bannerjoy/
├─ src/
│  ├─ images/
│  ├─ scripts/
│  ├─ styles/
│  └─ index.html
├─ gulpfile.js
└─ package.json
```

## Configuration

- Set `NODE_ENV=production` (handled automatically by `npm run build`) to enable minification and image optimization.
- Update BrowserSync options in `gulpfile.js` if you need a different port or proxy.

## License

MIT
