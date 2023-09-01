const addNumbers = (...numbers) => {

    // handling base-case for type-checking
    if (!numbers.every((num) => typeof num === 'number')) {
        const errorMessage = 'All inputs must be numbers.';
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    return numbers.reduce((acc, num) => acc + num, 0);
}


// valid-arguments
const result = addNumbers(5, 7, 10, 3.9);

// invalid-arguments
const error = addNumbers(10, 20, "john.doe")