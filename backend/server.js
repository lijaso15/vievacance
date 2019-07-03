"use strict";
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const { mongoose } = require("./db/mongoose");
const { User } = require("./models/User");
const { Photo } = require("./models/Photo");
const { Memento } = require("./models/Memento");
const Cookies = require("universal-cookie");
const session = require("express-session");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const cors = require("cors");

  const app = express();
  app.use(cors());
  const cookies = new Cookies();
  app.use(bodyParser.json());
  const upload = multer();
  app.disable("etag");

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: "oursecret",
      resave: false,
      cookie: {
        expires: 600000 * 3,
        secure: true
      },
      saveUninitialized: false
    })
  );

  // Answer API requests.
  app.get("/users", (req, res) => {
    console.log(req.session);
    const id = req.session.user;
    if (id) {
      User.findById(id)
        .then(user => {
          if (!user) {
            res.status(400).send();
            return;
          } else {
            res.status(200).send(user);
            return;
          }
        })
        .catch(err => res.status(500).send());
      return;
    } else {
      res.send({ _id: false });
    }
  });

  app.get("/users/logout", (req, res) => {
    if (!req.session) {
      res.status(200).send(false);
      return;
    } else {
      req.session.destroy(err => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(200).send(true);
        }
      });
    }
  });

  app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
      User.findById(id)
        .then(user => {
          if (!user) {
            res.status(400).send();
          } else {
            res.status(200).send(user);
          }
        })
        .catch(err => res.status(500).send());
      return;
    } else {
      res.send({ _id: false });
    }
  });

  app.post("/users", (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
      isadmin: false,
      profilePicture: ""
    });

    User.findByUsername(username)
      .then(
        bad => {
          User.findByEmail(email).then(
            bad => {
              res.status(400).send({
                username: "username is taken",
                email: "email is taken"
              });
            },
            stillbad => {
              res.status(400).send({ username: "username is taken" });
            }
          );
        },
        good => {
          User.findByEmail(email).then(
            bad => {
              res.status(400).send({ email: "email is taken" });
            },
            good => {
              user.save();
              res.status(200).send();
            }
          );
        }
      )
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.post("/users/login", (req, res) => {
    const { email, password } = req.body;

    User.findByEmailPassword(email, password)
      .then(
        user => {
          req.session.user = user._id;
          res.status(200).send(user);
        },
        bad => {
          res.status(400).send(bad);
        }
      )
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.post("/users/changeusername/:id", (req, res) => {
    const id = req.params.id;
    const newusername = req.body["new username:"];
    User.findByUsername(newusername).then(
      user => {
        res.status(400).send({ "new username:": "username is taken" });
      },
      nouser => {
        User.findById(id).then(curruser => {
          curruser.username = newusername;
          curruser.save();
          res.status(200).send();
        });
      }
    );
  });

  app.post("/users/changepassword/:id", (req, res) => {
    const id = req.params.id;
    const newpassword = req.body["new password:"];

    User.findById(id).then(curruser => {
      curruser.password = newpassword;
      curruser.save();
      res.status(200).send();
    });
  });

  app.post("/users/changeprofilepicture/:id", (req, res) => {
    const { photoId } = req.body;
    const id = req.params.id;

    User.findById(id)
      .then(user => {
        if (!user) {
          res.status(400).send();
        } else {
          user.profilePicture = `/photos/${id}/${photoId}`;
          user.save();
          res.status(200).send();
        }
      })
      .catch(err => res.status(500).send());
  });

  const cities = JSON.parse(fs.readFileSync("./web-scraping/cities.json"));

  const globeData = cities.city.map(c => {
    return {
      title: c.name + ", " + c.country,
      latitude: Number(c.latitude),
      longitude: Number(c.longitude),
      url: encodeURI("/citypage/" + c.name),
      popularity: Number(c.popularity),
      city: c.name,
      country: c.country
    };
  });

  app.get("/globeData", (req, res) => {
    res.send(JSON.stringify(globeData));
  });

  app.get("/globeData/:id", (req, res) => {
    const city = req.params.id;
    const data = cities.city.filter(c => {
      return c.name === city;
    })[0];
    // console.log(data)
    const cityData = {
      city: data.name,
      country: data.country,
      popularity: Number(data.popularity),
      paragraphs: data.content.description,
      images: data.content.photos
    };
    res.status(200).send(JSON.stringify(cityData));
  });

  app.post("/photos/:id", upload.single("avatar"), function(req, res) {
    const owner = req.params.id;
    const img = req.file.buffer;
    const encode_image = img.toString("base64");
    const finalImg = new Photo({
      contentType: req.file.mimetype,
      image: new Buffer.from(encode_image, "base64"),
      owner
    });
    finalImg.save();
    res.redirect("back");
  });

  app.get("/photos/:owner_id", (req, res) => {
    const owner = req.params.owner_id;
    Photo.find({ owner: owner })
      .then(photos => {
        if (!photos) {
          res.status(400).send();
        } else {
          res.contentType("image/jpeg");
          res.send(
            photos.map(photo => {
              return {
                id: photo._id,
                active: false
              };
            })
          );
        }
      })
      .catch(err => res.status(500).send());
  });

  app.delete("/photos/:owner_id/:photo_id", (req, res) => {
    const owner = req.params.owner_id;
    const photoId = req.params.photo_id;

    if (!(owner === cookies.get("user"))) {
      res.status(400).send();
      return;
    }

    Photo.findByIdAndDelete(photoId).catch(err => {
      res.status(500).send();
      return;
    });
    res.status(200).send();
  });

  app.get("/photos/:owner_id/:photo_id", (req, res) => {
    const owner = req.params.owner_id;
    const photoId = req.params.photo_id;
    Photo.findOne({ owner: owner, _id: photoId })
      .then(photo => {
        if (!photo) {
          // if the user deleted his profile picture then it will no longer
          // exist in the photo schema but there will be a link to it in the
          // user schema
          User.findById(owner).then(user => {
            // profile picture deleted
            if (user.profilePicture === photoId) {
              res.contentType("image/jpeg");
              Photo.findById("5d1bd57280c816eacdaac0db").then(
                avatar => {
                  res.contentType("image/jpeg");
                  res.send(avatar);
                },
                er => res.status(500).send()
              );
            } else {
              res.contentType("image/jpeg");
              Photo.findById("5d1bd57d80c816eacdaac0dc").then(
                empty => {
                  res.contentType("image/jpeg");
                  res.send(empty);
                },
                er => res.status(500).send()
              );
            }
          });
        } else {
          res.contentType("image/jpeg");
          res.send(photo.image.buffer);
        }
      })
      .catch(err => {
        res.status(500).send();
      });
  });

  app.post("/mementos/:owner_id", (req, res) => {
    const owner = req.params.owner_id;
    const { description, photos, city, country } = req.body;
    const memento = new Memento({ description, photos, city, owner, country });
    memento.save();

    res.status(200).send();
  });

  app.post("/mementos/edit/:mem_id", (req, res) => {
    const mem_id = req.params.mem_id;
    const { description, photos, city, country } = req.body;
    Memento.findOneAndUpdate(
      { _id: mem_id },
      { $set: { description, photos, city, country } }
    ).catch(err => {
      res.status(500).send();
      return;
    });
    res.status(200).send("yay");
  });

  app.get("/mementos", (req, res) => {
    Memento.find()
      .then(mems => {
        res.status(200).send(mems);
      })
      .catch(err => res.status(500).send());
  });

  app.get("/mementos/user/:owner_id", (req, res, next) => {
    const owner = req.params.owner_id;
    Memento.find({ owner: owner })
      .then(mementos => {
        if (!mementos) {
          res.status(400).send();
        } else {
          res.status(200).send(
            mementos.map(mem => {
              return {
                photos: mem.photos,
                id: mem._id,
                city: mem.city,
                description: mem.description,
                owner: mem.owner,
                active: false,
                country: mem.country
              };
            })
          );
        }
      })
      .catch(err => res.status(500).send());
  });

  app.get("/mementos/city/:city", (req, res) => {
    const city = req.params.city;
    Memento.find({ city: city })
      .then(mems => {
        res.status(200).send(mems);
      })
      .catch(err => res.status(500).send());
  });

  app.delete("/mementos/user/:mem_id", (req, res) => {
    const mem = req.params.mem_id;
    Memento.findByIdAndDelete(mem).catch(err => {
      res.status(500).send();
      return;
    });
    res.status(200).send();
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

  app.listen(PORT, function() {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
