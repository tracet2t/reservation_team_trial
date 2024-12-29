# reservation_team_trial
Trial Project for reservations system
# Set up a new React Todo list app
npx create-react-app todo-list-app
cd todo-list-app
npm start
# 1. Install Jest
npm install --save-dev jest
# 2. Configure Jest
Add a script in your package.json to run Jest: 
"scripts": {
  "test": "jest"
}
# 3. Write Tests for ToDo Component
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Technologies
Use Node.js, Express, and SQLite3 for the backend, and React.js for the frontend.

# sample Test
// sum.js
function sum(a, b) {
    return a + b;
  }
  module.exports = sum;

  // sum.test.js
const sum = require('./sum');

test('adds 1 + 6 to equal 7', () => {
  expect(sum(1, 6)).toBe(7);
});

// Result
![Screenshot 2024-08-08 011017](https://github.com/user-attachments/assets/3e945140-a4c1-44b4-88cf-092c1d4fc88e)



