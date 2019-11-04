all:
	make dependencies
	make core

dependencies:
	npm install

core:
	npm run build

clean:
	npm run clean
