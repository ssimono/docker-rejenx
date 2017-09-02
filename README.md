Docker-React-Jekyll-NGINX
=========================

Opinionated starting-kit for a Jekyll + React + REST API web app, all running within Docker containers. Starting a project from a fork of it removes the painfull, repetitive and time consuming setup of most small to medium sized web projects.

Inspired from the great [jekyll-webpack](https://github.com/allizad/jekyll-webpack). But dockerized, nginxed, development ready and deployment ready.

Development
-----------

Make sure that you have:

- docker
- docker-compose

Run:

    make up

Then open http://localhost:4000/

What you get:

- A [Jekyll][1] static website with an [Ink][2] scaffhold theme and [Font-awesome][3] setup
- A [React][3]/ES6/JSX [Airbnb linted][4] and [jest tested][4.1] javascript environment
- A seemless integration between the generated [Webpack][5] bundle and the Jekyll website
- A Makefile target that builds all static files into a production ready directory
- A working sample production docker-compose file with a tunable [NGINX][6] server
- A little *nodejs* api acting as a placeholder for your api
- A sample React app already wired up with the remote API
- A simple way to add Jekyll settings and Webpack constants from build-time env variables

[1]: https://jekyllrb.com/
[2]: http://ink.sapo.pt/
[3]: http://fontawesome.io/
[4]: https://github.com/airbnb/javascript
[4.1]: https://facebook.github.io/jest/
[5]: https://webpack.github.io/
[6]: http://nginx.org/

Deployment
----------

The first thing to do is to build a production ready build that contains all static assets cooked by Jekyll and Webpack:

- Provide all necessary settings in an *.env* file. `cp production.env.sample production.env` for a working example.
- Set the *env_file* env variable: `export ENV_FILE=production.env`
- Run `make`

This will create the build in a *build* folder, and will also build the Docker image for the API (e.g the "running" piece of your stack).

The way you will then deploy strongly depends on your pipeline, hosting and infrastructure. But it could be summarized with those three steps:

- Move your static build to a place where it can be served.
- Push your running services images to a Docker registry.
- Run your containers using the latest version from the Docker registry, with a configuration correctly set via environment variables.

To see it live, just use the sample "stack", after you made the build: `docker-compose -f production.yml up`. It will spawn Nginx and the sample node api, and mount the static build so it can be served. Open http://localhost:4002 to see it live!

Tunning
-------

This is just an abstract starting kit, so it is basically meant to be tuned by forking and then starting working on your project. If you have a different stack of technologies that you often use, you should first fork it to your own starting kit, adapt it to your needs (you might prefer [Bootstrap][10] over Ink, [Vuejs][11] over React...), and then fork your fork (yeah!) when you start a project.

[10]: (http://getbootstrap.com/)
[11]: (https://vuejs.org/)
