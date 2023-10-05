/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('fixsell_db');


const currentDate = new Date();
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(currentDate.getDate() + 7); 

// Add fields to all documents in the "printers" collection.
db.getCollection('printers').updateMany({}, {
    $set: {
        isDeal: false, // Set isDeal to false for all documents initially
        dealPrice: 25000, // Set dealPrice to null initially
        dealStartDate: currentDate, // Set dealStartDate to null initially
        dealEndDate: oneWeekFromNow, // Set dealEndDate to null initially
        dealDiscountPercentage: 0.3, // Set dealDiscountPercentage to null initially
        dealDescription: null, // Set dealDescription to null initially
    }
});

db.getCollection('printers').find().limit(10) // Limit the results to the first 10 documents for inspection