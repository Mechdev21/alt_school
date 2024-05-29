const http = require('http');
const inec = require('./selection'); // Ensure the correct path to your PartySystem file
const url = require('url');


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'POST' && parsedUrl.pathname === '/create') {
        let body = '';
        req.on('data', data => {
            body += data.toString();
        });

        req.on('end', () => {
            const partyData = JSON.parse(body);
            const { name, candidate, score } = partyData;
            inec.createParties(name, candidate, score);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Party created successfully' }));
        });

    } else if (req.method === 'POST' && parsedUrl.pathname === '/update') {
        let body = '';
        req.on('data', data => {
            body += data.toString();
        });

        req.on('end', () => {
            const { name } = JSON.parse(body);
            inec.updatePartyScore(name);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Party ${name}'s score updated successfully` }));
        });

    } else if (req.method === 'GET' && parsedUrl.pathname === '/getAll') {
        const allParties = inec.getAllParties();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allParties));

    } else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/getOne')) {
        const { name } = parsedUrl.query;
        const party = inec.getOneParty(name);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(party));

    } else if (req.method === 'DELETE' && parsedUrl.pathname.startsWith('/delete')) {
        const { name } = parsedUrl.query;
        const message = inec.deleteOneParty(name);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message }));

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000...');
});