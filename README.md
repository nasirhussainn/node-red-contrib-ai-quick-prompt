# Node-RED API Integration Package

A Node.js package to facilitate easy integration with external APIs within Node-RED. This package allows users to configure an API key, make requests, and process the responses directly in their Node-RED flows.

---

## **Table of Contents**
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Example with Node-RED](#example-with-node-red)
- [API](#api)
  - [setApiKey](#setapikey)
  - [fetchData](#fetchdata)
- [Contributing](#contributing)
- [License](#license)

---

## **Installation**

To install this package, use npm or yarn:

```bash
npm install node-red-api-integration
# or
yarn add node-red-api-integration

## **Usage**

Basic Example
To use the API integration package, follow the example below:

javascript
Insert Code
Run
const apiIntegration = require('node-red-api-integration');

// Set your API key
const apiKey = 'your-api-key';
apiIntegration.setApiKey(apiKey);

// Call API with specific parameters
apiIntegration.fetchData({ param1: 'value1', param2: 'value2' })
  .then(response => {
    console.log('API Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
Example with Node-RED
You can integrate this package directly into a Node-RED flow. Here's an example of how to use it in your flow:

Use a http request node to get the required parameters.
Use a function node to call the API via this package.
javascript
Insert Code
Run
Copy code
const apiIntegration = require('node-red-api-integration');

// Retrieve API key from flow variables
const apiKey = flow.get('apiKey');  // Or hard-code the key for testing

// Use incoming message data as parameters
const params = msg.payload;  // Assuming msg.payload contains { param1, param2 }

apiIntegration.setApiKey(apiKey);

apiIntegration.fetchData(params)
  .then(response => {
    msg.payload = response;
    return msg;  // Pass the response to the next node
  })
  .catch(error => {
    msg.payload = { error: 'Failed to fetch data', details: error };
    return msg;  // Pass error to the next node
  });
API
setApiKey
Sets the API key for making requests.

Parameters:
apiKey (string) — Your API key.
Usage Example:
javascript
Insert Code
Run
Copy code
const apiKey = 'your-api-key';
apiIntegration.setApiKey(apiKey);
fetchData
Fetch data from the API with the given parameters.

Parameters:
params (object) — The parameters to send in the API request.
Returns:
A promise that resolves to the API response.
Usage Example:
javascript
Insert Code
Run
Copy code
const params = { param1: 'value1', param2: 'value2' };
apiIntegration.fetchData(params)
  .then(response => {
    console.log('Data fetched:', response);
  })
  .catch(error => {
    console.error('API error:', error);
  });
Contributing
We welcome contributions! If you want to contribute, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for details.