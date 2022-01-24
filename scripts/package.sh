del-cli ./deploy &&
yarn run clean:build &&
mkdir -p output &&
mkdir -p deploy &&
cp -a ./libs/. output/libs &&
cp -a ./scripts/. output/scripts &&
cp -a ./dist/. output/dist &&
cp .env.production output/.env &&
cp ecosystem.config.js output/ecosystem.config.js &&
cp -r libs output/libs &&
cp package.json output/package.json &&
cd output &&
tar -zcvf ../deploy/production.tar.gz * .env &&
cd .. &&
del-cli ./output &&
del-cli ./dist