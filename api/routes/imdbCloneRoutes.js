const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Actor = require('../models/actor');
const Director = require('../models/director');
const Movie = require('../models/movie');
const Cast = require('../models/cast');

//Add User
router.post('/addUser', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: 'User exists... Please Login' });
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Retrieve a user by ID
router.get('/getUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});

// Retrieve all users
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
});

//User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = password == user.password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

// Movie Routes
//Add Movie
router.post('/movies', async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get All Movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find().populate('director');
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//get All movie titles and id
router.get('/moviesTitle', async (req, res) => {
    try {
        const movies = await Movie.find({}, 'title');
        res.status(200).json(movies.map(e => { return { id: e._id, movieTitle: e.title } }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Get actor by id
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const director = await Director.findById(movie.director);
        const cast = await Cast.find({ movieid: req.params.id }).populate('actorid', 'firstName lastName thumb');

        const response = {
            title: movie.title,
            thumb: movie.thumb,
            genre: movie.genre,
            description: movie.description,
            director: director.firstName + ' ' + director.lastName,
            directorid: director.id,
            directorThumb: director.thumb,
            releaseDate: movie.releaseDate,
            cast: cast
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Update movie
router.put('/movies/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete movie
router.delete('/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actor Routes
//add actor
router.post('/actors', async (req, res) => {
    try {
        const newActor = await Actor.create(req.body);
        res.status(201).json(newActor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Get all actors
router.get('/actors', async (req, res) => {
    try {
        const actors = await Actor.find({}, 'firstName lastName');
        res.status(200).json(actors.map(e => { return { id: e._id, actorName: e.firstName + ' ' + e.lastName } }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get actor by id
router.get('/actors/:id', async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: 'Actor not found' });
        }
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update actor
router.put('/actors/:id', async (req, res) => {
    try {
        const updatedActor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedActor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete actor
router.delete('/actors/:id', async (req, res) => {
    try {
        await Actor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Actor deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Director Routes
//Add director
router.post('/directors', async (req, res) => {
    try {
        const newDirector = await Director.create(req.body);
        res.status(201).json(newDirector);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Find all directors
router.get('/directors', async (req, res) => {
    try {
        const directors = await Director.find();
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get director list while adding movies
router.get('/directorsList', async (req, res) => {
    try {
        const directorsList = await Director.find({}, 'firstName lastName');
        res.status(200).json(directorsList.map(e => { return { id: e._id, directorName: e.firstName + ' ' + e.lastName } }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//udpate director
router.put('/directors/:id', async (req, res) => {
    try {
        const updatedDirector = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDirector);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete direcotr
router.delete('/directors/:id', async (req, res) => {
    try {
        await Director.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Director deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get direcor by id
router.get('/directors/:id', async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cast Routes
//Add Cast
router.post('/cast', async (req, res) => {
    try {
        const newCast = await Cast.create(req.body);
        res.status(201).json(newCast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//add multipleCast
router.post('/addMovieCast/:id', (req, res) => {
    try {
        const movieId = req.params.id;
        const castList = req.body;
        castList.map((item) => {
            Cast.create({ movieid: movieId, actorid: item, role: '' });
        })
        res.status(200).json({ message: 'added' });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/deleteAllCastForMovie/:id', async (req, res) => {
    try {
        await Cast.deleteMany({ movieid: req.params.id });
        res.status(200).json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
})


//get All Casst
router.get('/cast', async (req, res) => {
    try {
        const castEntries = await Cast.find().populate('movie actor');
        res.status(200).json(castEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//get Movie Casst
router.get('/cast/:id', async (req, res) => {
    try {
        const castEntries = await Cast.find({ movieid: req.params.id });
        res.status(200).json(castEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//get cast by id
router.get('/cast/:id', async (req, res) => {
    try {
        const castEntry = await Cast.findById(req.params.id).populate('movie actor');
        if (!castEntry) {
            return res.status(404).json({ message: 'Cast not found' });
        }
        res.status(200).json(castEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//update cast
router.put('/cast/:id', async (req, res) => {
    try {
        const updatedCast = await Cast.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//delete cast
router.delete('/cast/:id', async (req, res) => {
    try {
        await Cast.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Cast deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//search 
router.get('/moviesSearch', async (req, res) => {
    const title = req.query.title;
    try {
        const movies = await Movie.find({
            title: { $regex: new RegExp(title, 'i') },
        });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/moviesSearchByActor', async (req, res) => {
    const actorName = req.query.actorname;
    try {
        const actors = await Actor.find({
            $or: [
                { firstName: { $regex: new RegExp(actorName, 'i') } },
                { lastName: { $regex: new RegExp(actorName, 'i') } }
            ]
        })
        if (actors.length === 0) {
            //not found actor no movies
            res.status(200).json([]);
        }
        const actorIds = actors.map(actor => actor._id);
        const casts = await Cast.find({ actorid: { $in: actorIds } });
        const movieIds = casts.map(cast => cast.movieid);
        const movies = await Movie.find({ _id: { $in: movieIds } });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;