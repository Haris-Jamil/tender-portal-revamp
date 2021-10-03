function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const app = express();
// app.use(requireHTTPS);

app.use(express.static('./dist/tender-portal-revamp'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/tender-portal-revamp/'}
  );
});

app.listen(process.env.PORT || 8080, () => {
    console.log('app working on port 8080');
});