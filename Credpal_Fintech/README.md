# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Project Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Credpal_Fintech
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install --legacy-peer-deps
   ```

3. Create a `.env` file in the root directory and configure the environment variables as needed. Below is an example:

   ```env
   VITE_API_BASE_URL=https://api.example.com
   VITE_API_KEY=your-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Functionalities
This project includes the following features:
- **React with TypeScript**: Ensures type safety and better developer experience.
- **Vite**: Provides fast builds and HMR (Hot Module Replacement).
- **ESLint Configuration**: Includes recommended and type-aware linting rules for cleaner code.
- **Environment Variables**: Supports `.env` files for managing sensitive data and configuration.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Building for Production
To build the project for production, run:
```bash
npm run build
# or
yarn build
```

The output will be in the `dist` directory.

## Deployment
After building the project, you can deploy the contents of the `dist` directory to any static hosting service like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or [GitHub Pages](https://pages.github.com/).

## Additional Notes
- Ensure your `.env` file is not committed to version control by adding it to `.gitignore`.
- For API integrations, replace the placeholder values in the `.env` file with your actual credentials.

Feel free to customize this template to suit your project's needs!
