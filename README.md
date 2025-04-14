# Playwright Auto Test

This repository contains automated tests using Playwright for web testing.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd auto-test
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Test Structure

```plaintext
auto-test/
├── tests/
│   ├── api.spec.js       # API test cases
│   └── bitcastle.spec.js # UI test cases
├── package.json
└── README.md
```

## Running Tests

### Basic Test Commands

- Run all tests:

```bash
npm test
```

- Run tests in watch mode:

```bash
npm run test:watch
```

- Run tests with UI mode (great for debugging):

```bash
npm run test:ui
```

### Browser-Specific Tests

- Run tests in Chrome only:

```bash
npm run test:chrome
```

- Run tests in Firefox only:

```bash
npm run test:firefox
```

- Run tests in WebKit only:

```bash
npm run test:webkit
```

- Run tests in all browsers:

```bash
npm run test:all
```

### Debug Mode

- Run tests in debug mode:

```bash
npm run test:debug
```

## Test Reports

- View test reports:

```bash
npm run show-report
```

## Environment Variables

The test suite uses the following environment variables:

- `BASE_URL`: Base URL for the application (default: http:localhost:3000)
- `LOGIN_USERNAME`: Test user email
- `LOGIN_PASSWORD`: Test user password

## Common Issues and Solutions

1. **Tests failing to start:**

   - Ensure all browsers are installed:

   ```bash
   npx playwright install
   ```

   - Clear browser cache:

   ```bash
   npx playwright clear-cache
   ```

2. **Element not found errors:**

   - Check if selectors are correct
   - Increase timeout values if needed
   - Verify if the element is in viewport

3. **Authentication issues:**
   - Verify credentials are correct
   - Check if the authentication endpoint is accessible
   - Ensure proper network connectivity

## Best Practices

1. **Writing Tests:**

   - Keep tests independent
   - Use meaningful test descriptions
   - Follow the AAA pattern (Arrange, Act, Assert)
   - Avoid hard-coded waits

2. **Maintenance:**
   - Regular updates of Playwright and dependencies
   - Review and update selectors when UI changes
   - Document any special test requirements

## Contributing

1. Create a new branch for your feature
2. Write tests following the existing patterns
3. Ensure all tests pass locally
4. Submit a pull request with detailed description

## License

ISC

## Support

For issues and questions, please create a new issue in the repository.

```

This comprehensive README now includes:
- Complete installation instructions
- Detailed test execution commands
- Project structure
- Environment setup
- Troubleshooting guide
- Best practices
- Contribution guidelines
- Support information

The documentation is structured to help both new and experienced team members understand and work with the test suite effectively.
```
