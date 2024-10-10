# Playwright Project
This is a Playwright project used for end-to-end testing. It supports multiple browsers including Chromium, Firefox, and WebKit, making it ideal for cross-browser testing.

## Installation
To install Playwright, follow these steps:
```bash
npm init playwright@latest
```
This command will install the latest version of Playwright and set up the project.

## Running Tests
Trace and Debug
To run the tests with tracing enabled and debug the execution:
```bash
npx playwright test --project=chromium --trace on
```
Tracing helps in capturing screenshots, network activity, console logs, and more to assist with debugging.

## Debugging Mode
To run the tests in debugging mode (with browser UI):
```bash
npx playwright test --project=chromium --debug
```
This mode launches the browser in a visible mode and pauses test execution, allowing you to interact with the browser for better troubleshooting.



## Playwright Dashboard
To open the Playwright dashboard, use:
```bash
npx playwright show-report
npx playwright test --ui

```
This allows to Explore test suites and individual test cases in an intuitive visual format and Inspect test results in detail, including screenshots, videos, logs, and traces.
