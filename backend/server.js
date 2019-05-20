'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const fs = require('fs')
const cookieSession = require('cookie-session')

// Mongoose
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/User')
const Cookies = require('universal-cookie');

const cookies = new Cookies();

// Express
const port = process.env.PORT || 3001
const app = express();
// app.use(cors());
app.use(bodyParser.json())

// Add express sesssion middleware
// app.set('trust proxy', 1)
if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__const log = console.log;
        const express = require('express')
        const bodyParser = require('body-parser')
        const { ObjectID } = require('mongodb')
        const fs = require('fs')
        const cookieSession = require('cookie-session')
        // Mongoose
        const { mongoose } = require('./db/mongoose');
        const { User } = require('./models/User')
        const Cookies = require('universal-cookie');

        const cookies = new Cookies();
        const path = require('path');
        const cluster = require('cluster');
        const numCPUs = require('os').cpus().length;

        const isDev = process.env.NODE_ENV !== 'production';
        const PORT = process.env.PORT || 5000;

        // Multi-process to utilize all CPU cores.
        if (!isDev && cluster.isMaster) {
            console.error(`Node cluster master ${process.pid} is running`);

            // Fork workers.
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code, signal) => {
                console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
            });

        } else {
            const app = express();
            app.use(bodyParser.json())
            // Priority serve any static files.
            app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
            // app.use(express.static(path.resolve(__dirname, './react-ui/public')));

            // Answer API requests.
            app.get('/users', (req, res) => {
                const id = cookies.get('user')
                if (id) {
                    res.send(id)
                } else {
                    res.send(false)
                }
            })


            app.post('/users', (req, res) => {

                const { username, email, password } = req.body
                const user = new User({
                    username, email, password,
                    isadmin: false,
                    profilePicture: '/assets/tmp.png'
                })

                User.findByUsername(username).then((bad) => {
                    User.findByEmail(email).then((bad) => {
                        res.status(400).send({
                            username: 'username is taken',
                            email: 'email is taken'
                        })
                    }, (stillbad) => {
                        res.status(400).send({ username: 'username is taken' })
                    })
                }, (good) => {
                    User.findByEmail(email).then((bad) => {
                        res.status(400).send({ email: 'email is taken' })
                    }, (good) => {
                        user.save()
                        res.status(200).send()
                    })
                }).catch((err) => {
                    res.status(500).send(err)
                })
            })

            app.post('/users/login', (req, res) => {

                const { email, password } = req.body

                User.findByEmailPassword(email, password).then((user) => {
                    cookies.set('user', user._id, { path: '/' });
                    res.status(200).send(user._id)
                }, (bad) => {
                    res.status(400).send(bad)
                }).catch((err) => {
                    res.status(500).send(err)
                })
            })

            app.get('/users/logout', (req, res) => {
                cookies.remove('user')
                res.status(200).send()
            })

            const cities = JSON.parse(fs.readFileSync('./web-scraping/cities.json'))

            //Five colour heatmap
            function assignColour(popularity) {

                if (popularity < 10) {
                    return "#ff3860" //danger
                } else if (popularity < 30) {
                    return "#ffdd57" //warning
                } else if (popularity < 50) {
                    return "#23d160" //success
                } else if (popularity < 75) {
                    return "#209cee" //info
                } else {
                    return "#00d1b2" //primary
                }
            }

            const globeData = cities.city.map((c) => {
                return {
                    "title": c.name + ', ' + c.country,
                    "latitude": Number(c.latitude),
                    "longitude": Number(c.longitude),
                    "url": encodeURI("/citypage/" + c.name),
                    "popularity": assignColour(Number(c.popularity))
                }
            })

            app.get('/globeData', (req, res) => {
                res.send(JSON.stringify(globeData))
            })




            app.get('/globeData/:id', (req, res) => {
                const city = req.params.id
                const data = cities.city.filter((c) => { return c.name === city })[0]
                const cityData = {
                    city: data.name,
                    country: data.country,
                    popularity: Number(data.popularity),
                    paragraphs: data.content.description,
                    images: data.content.photos
                }
                res.status(200).send(JSON.stringify(cityData))
            })


            // All remaining requests return the React app, so it can handle routing.
            app.get('*', function (request, response) {
                response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
                // response.sendFile(path.resolve(__dirname, './react-ui/public', 'index.html'));
            });

            app.listen(PORT, function () {
                console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
            });
        }
        dirname, 'client', 'build', 'index.html'));
});
}

app.get('/users', (req, res) => {
    const id = cookies.get('user')
    if (id) {
        res.send(id)
    } else {
        res.send(false)
    }
})


app.post('/users', (req, res) => {

    const { username, email, password } = req.body
    const user = new User({
        username, email, password,
        isadmin: false,
        profilePicture: '/assets/tmp.png'
    })

    User.findByUsername(username).then((bad) => {
        User.findByEmail(email).then((bad) => {
            res.status(400).send({
                username: 'username is taken',
                email: 'email is taken'
            })
        }, (stillbad) => {
            res.status(400).send({ username: 'username is taken' })
        })
    }, (good) => {
        User.findByEmail(email).then((bad) => {
            res.status(400).send({ email: 'email is taken' })
        }, (good) => {
            user.save()
            res.status(200).send()
        })
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/users/login', (req, res) => {

    const { email, password } = req.body

    User.findByEmailPassword(email, password).then((user) => {
        cookies.set('user', user._id, { path: '/' });
        res.status(200).send(user._id)
    }, (bad) => {
        res.status(400).send(bad)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/users/logout', (req, res) => {
    cookies.remove('user')
    res.status(200).send()
})

const cities = JSON.parse(fs.readFileSync('./web-scraping/cities.json'))

//Five colour heatmap
function assignColour(popularity) {

    if (popularity < 10) {
        return "#ff3860" //danger
    } else if (popularity < 30) {
        return "#ffdd57" //warning
    } else if (popularity < 50) {
        return "#23d160" //success
    } else if (popularity < 75) {
        return "#209cee" //info
    } else {
        return "#00d1b2" //primary
    }
}

const globeData = cities.city.map((c) => {
    return {
        "title": c.name + ', ' + c.country,
        "latitude": Number(c.latitude),
        "longitude": Number(c.longitude),
        "url": encodeURI("/citypage/" + c.name),
        "popularity": assignColour(Number(c.popularity))
    }
})

app.get('/globeData', (req, res) => {
    res.send(JSON.stringify(globeData))
})




app.get('/globeData/:id', (req, res) => {
    const city = req.params.id
    const data = cities.city.filter((c) => { return c.name === city })[0]
    const cityData = {
        city: data.name,
        country: data.country,
        popularity: Number(data.popularity),
        paragraphs: data.content.description,
        images: data.content.photos
    }
    res.status(200).send(JSON.stringify(cityData))
})




//////////

app.listen(port, () => {
    log(`Listening on port ${port}...`)
});



