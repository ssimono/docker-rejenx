Scaffholder project for Docker-Jekyll-Webpack-React-Nginx
======================================================

Inspired from the great [jekyll-webpack](https://github.com/allizad/jekyll-webpack) by [allizad](https://github.com/allizad). But dockerized, nginxed, development ready and deployment ready.

Development
-----------

Run:

    make up

Then open http://localhost:4000/

What you get:

- A jekyll static website, with a SCSS-powered [minima](https://github.com/jekyll/minima) theme
- A ES6/JSX/React [Airbnb linted](https://github.com/airbnb/javascript) javascript environment
- A compilation of your react source down to one or several browser-friendly js bundles
- A seemless integration between the generated bundle and the jekyll website
- A live regeneration of the page upon code changes
- A Makefile target that builds all static files into a production ready directory
- A production docker-compose environment with a tunable nginx server
- A little node-js api acting as a placeholder for your api
- A sample React app already wired up with the remote API
- A simple way to add Jekyll settings and react constants from build-time env variables

Deployment
----------
