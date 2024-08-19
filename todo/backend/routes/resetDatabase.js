const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

db.serialize(() => {
    // Add expiration column if it doesn't exist
    db.run(`
        ALTER TABLE tasks ADD COLUMN expiration TEXT
    `, (err) => {
        if (err) {
            console.error('Error adding column:', err.message);
        } else {
            console.log('Column added successfully.');
        }
        db.close();
    });
});
