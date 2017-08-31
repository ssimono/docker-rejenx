.PHONY: up, clean

all:
	mkdir -p build
	docker-compose run --rm webpack yarn install
	docker-compose run --rm webpack yarn run lint
	docker-compose run --rm webpack yarn run build
	docker-compose run --rm jekyll jekyll build
	docker-compose build api
	cp -r jekyll/_site build/
	mv build/_site/deploy build/

up: webpack/node_modules
	docker-compose up

webpack/node_modules:
	docker-compose run --rm webpack yarn install

clean:
	rm -rf build
	docker-compose run --rm jekyll rm -rf _site
	docker-compose run --rm webpack rm -rf node_modules
