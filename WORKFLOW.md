# Production Workflow

This document outlines the development and deployment workflow for the project.

## Scripts

- **`dev`**: Start the development server (`vite`).
- **`build`**: Build the production bundle.
- **`lint`**: Run ESLint to catch code quality issues.
- **`typecheck`**: Run TypeScript compiler to check for type errors.
- **`test`**: Run unit tests with Vitest.
- **`preview`**: Preview the production build locally.

## Continuous Integration (CI)

We use GitHub Actions for CI. The workflow is defined in `.github/workflows/ci.yml`.

### Triggers
- Push to `main`
- Pull Request to `main`

### Jobs
1. **Code Quality**: Runs `lint`, `typecheck`, and `test`.
2. **Build Check**: Runs `build` to ensure the project compiles successfully.

## Docker

The application is containerized using a multi-stage Dockerfile.

### Building the Image
```bash
docker build -t my-app .
```

### Running the Container
```bash
docker run -p 8080:80 my-app
```
Access the app at `http://localhost:8080`.

## Contribution Guidelines

1. Create a new branch for your feature or fix.
2. Ensure `npm run lint`, `npm run typecheck`, and `npm run test` pass locally.
3. Open a Pull Request. CI will automatically run verification checks.
