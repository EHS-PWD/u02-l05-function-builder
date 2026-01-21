const fs = require('fs');
const path = require('path');

// Read and evaluate the student's script.js file
const scriptPath = path.join(__dirname, '..', 'script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Create a function to evaluate the script and extract functions
function loadStudentFunctions() {
  const context = {};
  const wrappedScript = `
    ${scriptContent}
    if (typeof dailyMotivation !== 'undefined') context.dailyMotivation = dailyMotivation;
    if (typeof favoriteNumber !== 'undefined') context.favoriteNumber = favoriteNumber;
    if (typeof calculateTotal !== 'undefined') context.calculateTotal = calculateTotal;
    if (typeof greetUser !== 'undefined') context.greetUser = greetUser;
  `;
  eval(wrappedScript);
  return context;
}

let studentFunctions;

beforeAll(() => {
  studentFunctions = loadStudentFunctions();
});

// Project 1: Daily Motivation Function Tests
describe('Project 1: dailyMotivation Function', () => {
  test('dailyMotivation function exists', () => {
    expect(typeof studentFunctions.dailyMotivation).toBe('function');
  });

  test('dailyMotivation returns a string', () => {
    const result = studentFunctions.dailyMotivation();
    expect(typeof result).toBe('string');
  });

  test('dailyMotivation returns a non-empty string', () => {
    const result = studentFunctions.dailyMotivation();
    expect(result.length).toBeGreaterThan(0);
  });
});

// Project 2: Favorite Number Checker Tests
describe('Project 2: favoriteNumber Function', () => {
  test('favoriteNumber function exists', () => {
    expect(typeof studentFunctions.favoriteNumber).toBe('function');
  });

  test('favoriteNumber returns correct message for numbers > 10', () => {
    const result = studentFunctions.favoriteNumber(21);
    expect(result).toBe("That's a big favorite number!");
  });

  test('favoriteNumber returns correct message for numbers <= 10', () => {
    const result = studentFunctions.favoriteNumber(7);
    expect(result).toBe("That's a cool number!");
  });

  test('favoriteNumber returns correct message for exactly 10', () => {
    const result = studentFunctions.favoriteNumber(10);
    expect(result).toBe("That's a cool number!");
  });
});

// Project 3: Shopping Total Calculator Tests
describe('Project 3: calculateTotal Function', () => {
  test('calculateTotal function exists', () => {
    expect(typeof studentFunctions.calculateTotal).toBe('function');
  });

  test('calculateTotal returns correct total for 5 x 3', () => {
    const result = studentFunctions.calculateTotal(5, 3);
    expect(result).toBe("Your total is $15.");
  });

  test('calculateTotal returns correct total for 10 x 2', () => {
    const result = studentFunctions.calculateTotal(10, 2);
    expect(result).toBe("Your total is $20.");
  });

  test('calculateTotal returns correct total for 1 x 1', () => {
    const result = studentFunctions.calculateTotal(1, 1);
    expect(result).toBe("Your total is $1.");
  });
});

// Project 4: Greeting Generator Tests
describe('Project 4: greetUser Function', () => {
  test('greetUser function exists', () => {
    expect(typeof studentFunctions.greetUser).toBe('function');
  });

  test('greetUser returns correct greeting with name provided', () => {
    const result = studentFunctions.greetUser("Alex");
    expect(result).toBe("Hello, Alex!");
  });

  test('greetUser returns correct greeting with default parameter', () => {
    const result = studentFunctions.greetUser();
    expect(result).toBe("Hello, Guest!");
  });

  test('greetUser works with different names', () => {
    const result = studentFunctions.greetUser("Jordan");
    expect(result).toBe("Hello, Jordan!");
  });
});
