DEPS := webpack/node_modules jekyll/about.md

# Shortcut commands
jekyll := docker-compose run --rm jekyll jekyll
yarn   := docker-compose run --rm webpack yarn

all: build

build:
	# Generate build folder for static assets
	mkdir -p build
	$(yarn) install --frozen-lockfile
	$(yarn) run build
	$(jekyll) build
	cp -r jekyll/_site build/
	mv build/_site/deploy build/

	# Build Docker image for api
	docker-compose build api

webpack/node_modules:
	$(yarn) install

jekyll/about.md: README.md
	echo "---\ntitle: About\nlayout: default\n---\n\n" > jekyll/about.md
	cat README.md >> jekyll/about.md

# Management shortcuts
.PHONY: up check clean

up: $(DEPS)
	docker-compose up

check: $(DEPS)
	$(yarn) run lint
	$(yarn) run test

clean:
	rm -rf build
	docker-compose run --rm jekyll rm -rf _site .sass-cache
	docker-compose run --rm webpack rm -rf node_modules bundle
