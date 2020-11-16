echo 'Cleaning up build'

# TODO: Avoid npm install modify this file in the first place
git checkout yarn.lock package-lock.json package.json yarn.lock
rm -r ./build ./android
