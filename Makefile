upgrade:
	npm --prefix client/ upgrade
	npm --prefix server/ upgrade
	
install:
	npm --prefix client/ install
	npm --prefix server/ install

runc:
	npm run start:client --prefix client/

runs:
	npm run start:server --prefix server/

build:
	rm -rf client/build
	npm --prefix client/ run build