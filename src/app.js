const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

// to configure the app

// Define directories paths 
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// Setup static directory dir to serve
app.use(express.static(publicDir));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tammy Nkuna'
  })
})


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Tammy Nkuna'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Tammy Nkuna',
    msg: "Welcome to the help page"
  });
})

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    title: 'Help',
    name: 'Tammy Nkuna',
    msg: "Help article not found"
  });
})



app.get('/weather', (req, res) => {
  const Place = req.query.address;
  if (Place) {

    // it is common to have 2 arguments on a callback
    geocode(Place, (error, {lat,long,place} = {}) => {
      if (error) {
        return res.send({error});
      };
      forecast(lat, long, (error, { temp, precip,summary } = {} ) => {
        if (error) {
          return res.send(error)
        };
          res.send({ place, temp, summary, precip });
              // console.log(`location: ${place}\ntemperature: ${temp}°C\nprecip: ${precip}\nsummary: ${summary}`)
      })
    });
  } else {
    res.send({
      error: "address mandatory"
      })
  }
})

    app.get('/products', (req, res) => {
      console.log(req.query);
      res.send({
        products: []
      });
    });

    app.get('*', (req, res) => {
      res.render('notFound', {
        title: '404 Not Found',
        name: 'Tammy Nkuna',
        message: 'Page not found'
      })

    });

    // app.get('/weather', (req, res) => {
    //   res.send('<h1>Weather Page!</h1>'); // can send an HTML or JSON as response
    // })

    app.listen(port, () => {
      console.log(`Server is starting on port ${port}`);
    }) // start server