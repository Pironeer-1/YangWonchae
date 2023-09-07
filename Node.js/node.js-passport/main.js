var express = require('express');
var app = express();
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
app.use(helmet());
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}));
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var authData = {
    email: 'egoing777@gmail.com',
    password: '111111',
    nickname: 'egoing'
}

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'pwd'
    },
    function verify(username, password, cb) {
        console.log('LocalStrategy', username, password);
        if(username === authData.email) {
            console.log(1);
            if(password === authData.password) {
                console.log(2);
                return cb(null, authData, {
                    message: "Welcome."
                });
            } else {
                console.log(3);
                return cb(null, false, {
                    message: 'Incorrect password.'
                });
            }
        } else {
            console.log(4);
            return cb(null, false, {
                message: 'Incorrect username.'
            });
        }
    /*
    db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
        });
    });
    */
}));

app.post('/auth/login_process', 
    passport.authenticate('local', {failureRedirect: '/auth/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

app.get('*', function(request, response, next) {
    fs.readdir('./data', function(error, filelist) {
        request.list = filelist;
        next();
    });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});
