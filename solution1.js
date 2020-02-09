// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const validateCred = (cardNumber) => {
    const checkCred = [];

    // copy card number to new array to avoid mutation
    const creditCardNumber = [...cardNumber];
    
    // remove check digit and store
    checkCred.push(creditCardNumber.pop());
    
    // reverse credit card number to start from left
    const reversed = creditCardNumber.reverse();
    
    // double only if it is at an even index starting with 0
    for (let i=0; i<reversed.length; i++) {
        if (i%2 === 0) {
            // even index
            let double = reversed[i] *= 2;
            double > 9 ? checkCred.push(double-9) : checkCred.push(double);
        } else {
            checkCred.push(reversed[i])
        }
    }

    // sum all numbers in the new array
    const sum = checkCred.reduce((acc, val) => acc + val, 0);
    return sum%10 === 0;
}

const findInvalidCards = (creditCards) => {
    const invalidCards = [];

    for (let i=0; i<creditCards.length; i++) {
        // push card to invalid cards array if validateCred returns false
        validateCred(creditCards[i]) ? '' : invalidCards.push(creditCards[i])
    }

    return invalidCards;
}

const idInvalidCardCompanies = (invalidCards) => {
    const companies = [];

    // indexOf checking makes sure the company only appears once in the array
    for (let i=0; i<invalidCards.length; i++) {
        if (invalidCards[i][0] === 3) {
            if (companies.indexOf('Amex') === -1) {
                companies.push('Amex');
            }
        } else if (invalidCards[i][0] === 4) {
            if (companies.indexOf('Visa') === -1) {
                companies.push('Visa');
            }
        } else if (invalidCards[i][0] === 5) {
            if (companies.indexOf('Mastercard') === -1) {
                companies.push('Mastercard');
            }
        } else if (invalidCards[i][0] === 6) {
            if (companies.indexOf('Discover') === -1) {
                companies.push('Discover');
            }
        } else {
            console.log("Company not found")
        }
    }

    return companies;
}

// project extension
const convertStringToCardArray = (stringCard) => {
    const newCard = [];

    for(let i=0; i<stringCard.length; i++) {
        newCard.push(parseInt(stringCard[i]))
    }

    return newCard
}


// TEST
console.log(validateCred(valid1)); // should return true
console.log(validateCred(invalid3)); // should return false
console.log(findInvalidCards([invalid1, invalid2, valid1])) // should return invalid1 and invalid2
console.log(idInvalidCardCompanies(findInvalidCards(batch))) // should return the companies withoud duplicates
console.log(convertStringToCardArray('1234567812345678')) // should return string into an array of integers