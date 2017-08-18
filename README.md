Scaffholder project for Docker-Jekyll-Webpack-React-Nginx
======================================================

Inspired from the great [jekyll-webpack](https://github.com/allizad/jekyll-webpack) by [allizad](https://github.com/allizad). But dockerized, nginxed, development ready and deployment ready.

Development
-----------

Run:

    run --rm webpack yarn install
    docker-compose up

Then open http://localhost:4000/

What you get:

- A jekyll static website, with a SCSS-powered [minima](https://github.com/jekyll/minima) theme
- A ES6/JSX/React javascript environment
- A compilation of the above down to a single browser-friendly js bundle
- A seemless integration between the generated bundle and the jekyll website
- A live regeneration of the page upon code changes

Deployment
----------
