const path = require('path');
const fs = require('fs');
const baseDir = path.join(__dirname, '../actions');

class PartySystem {
    // Read the directory and return the list of files
    readDirectory() {
        const files = fs.readdirSync(baseDir);
        return files;
    }

    // Check if a particular file exists in the directory
    fileExists(_filename) {
        const files = this.readDirectory();
        return files.includes(`${_filename}.json`);
    }

    // Create a new party
    createParties(name, candidate, score) {
        const files = this.readDirectory();
        if (files.length >= 3) {
            console.log('Max party limit reached');
            return;
        }

        const filepath = path.join(baseDir, `${name}.json`);
        const data = JSON.stringify({ name, candidate, score });

        // Create the file and write data to it
        fs.open(filepath, 'w', (err, fd) => {
            if (err) {
                throw err;
            }
            fs.writeFile(fd, data, (err) => {
                if (err) {
                    throw err;
                }
                console.log(`Party ${name} created successfully.`);
                // Close the file descriptor
                fs.close(fd, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
    }

    // Get all parties
    getAllParties() {
        const allParties = [];
        const parties = this.readDirectory();
        parties.forEach((party) => {
            const filePath = path.join(baseDir, party);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            allParties.push(JSON.parse(fileContent));
        });
        console.log(allParties);
        return allParties;
    }

    // Update the score of a party by incrementing it by one
    updatePartyScore(name) {
        const filepath = path.join(baseDir, `${name}.json`);

        if (!this.fileExists(name)) {
            console.log(`Party ${name} does not exist.`);
            return;
        }

        const fileContent = fs.readFileSync(filepath, 'utf-8');
        const partyData = JSON.parse(fileContent);
        partyData.score += 1;

        const updatedData = JSON.stringify(partyData);
        fs.writeFileSync(filepath, updatedData);
        console.log(`Party ${name}'s score updated to ${partyData.score}.`);
    }

    // Read a single party's data
    getOneParty(_filename) {
        const isFound = this.fileExists(_filename);
        if (isFound) {
            const filePath = path.join(baseDir, `${_filename}.json`);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return fileContent;
        } else {
            return "File not found";
        }
    }

    // Delete a single party's data
    deleteOneParty(_filename) {
        const isFound = this.fileExists(_filename);
        if (isFound) {
            const filePath = path.join(baseDir, `${_filename}.json`);
            fs.unlinkSync(filePath); // Changed fs.unlink to fs.unlinkSync to avoid callback issues
            return "Deleted successfully";
        } else {
            return "File not found";
        }
    }
}


// Export the PartySystem class
const partysystem = new PartySystem();
module.exports = partysystem;