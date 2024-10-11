## Playwright Testing Framework

This repository contains a robust testing framework built using Playwright, providing comprehensive end-to-end testing capabilities, The project incorporates modern testing practices, including page object models, Allure reporting, and mobile emulator configurations, with a structured set of smoke and regression test cases.

## Course : Playwright: Web Automation Testing From Zero to Hero

## Tutor : Artem Bondar

### 💻 Prerequisites
Node.js (v14 or higher)\
npm (v6 or higher)\
Playwright installed globally or locally in the project\

### 🚀 Technologies Used:
Playwright: Leverages Playwright's API testing capabilities for accurate and reliable request/response validation.\
TypeScript: Ensures type safety and enhances test reliability and maintainability.\
JSON: Used to mock API responses and define test data. Axios/Fetch API (optional): Used in some cases to handle complex API request scenarios.\

### 🚀 Getting Started
This project utilizes Playwright for testing and requires a local server to be running before the tests can be executed. Follow the instructions below to set up the project, start the local server, and run the Playwright tests.



### Project Setup

Clone the repository:

```bash
git clone https://github.com/rashmiiyengar/playwright.git
cd playwright
```

Install dependencies: Run the following command to install the necessary Node.js modules:
```bash
npm install
```

Start the local application: You need to run the application locally for the tests to work. To start the app, run the following command:
```bash
npm start
```

Ensure that the server is running on http://localhost:4200 (or the configured URL in the playwright.config.ts file).

## Running the Tests

### Running All Tests
To execute all test cases (including smoke, regression, and mobile), use the following command:

```bash
npx playwright test
```

### Running Specific Tests
You can also run tests based on their tags or specific test files:

```bash
npx playwright test tests/usePageObjects.spec.ts
```

### To run only smoke or regression tests, you can set up tagging in Playwright:

```bash
To run only smoke or regression tests, you can set up tagging in Playwright:
```

### 📱 Mobile Emulator Tests
Mobile emulator tests can be run with the following:

```bash
npx playwright test --project=mobile
```

## 📊 Test Reports

This project is integrated with Allure Playwright for detailed test reports. After running the tests, the reports can be generated and viewed as follows:

```bash
npm run generate:allure
```

Clean previous reports and generate new ones:

```bash
npm run clean:allure
```

<img width="1627" alt="Screenshot 2024-10-10 at 8 00 15 PM" src="https://github.com/user-attachments/assets/cdca2e5e-ab2c-4c90-aac9-8ec25a8f5cf1">

The reports will be available in the allure-reports directory. You can view them by opening the generated HTML files.\

Other reports for retry logic\
<img width="808" alt="Screenshot 2024-10-10 at 4 50 14 PM" src="https://github.com/user-attachments/assets/c82156bd-4f64-4964-a4a0-94f726433cf4">


### 🛠️ Configuration
<img width="1169" alt="image" src="https://github.com/user-attachments/assets/d272b2da-8092-4d41-8389-7cb814e0c798">
<img width="1256" alt="image" src="https://github.com/user-attachments/assets/2e01db82-aedf-4b2a-80e1-fc8aa6a40a91">

You can configure different environments (like dev, staging, etc.) in the playwright.config.ts file.

### 📬 Contributing
Contributions are welcome! Please ensure that you run all tests and generate reports before submitting a pull request.


### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin
