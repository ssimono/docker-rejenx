all:
	mkdir -p build
	docker-compose run --rm webpack yarn install
	docker-compose run --rm webpack yarn run build
	docker-compose run --rm jekyll jekyll build
	cp -r jekyll/_site build/
	mv build/_site/deploy build/
