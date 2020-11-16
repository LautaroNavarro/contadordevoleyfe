set -e

echo 'Building apk process. Partially automated'

echo 'Building React prodution build'
npm run build

echo 'Installing ionic globally'
npm install -g @ionic/cli

echo 'Installing capacitor core'
echo y | npm install @capacitor/core --save

echo 'Installing capacitor cli'
echo y | npm install @capacitor/cli --save

echo 'Creating android app'
ionic capacitor add android

echo 'Replacing resources'
rm -r ./android/app/src/main/res/ && cp -r ./resources ./android/app/src/main/res

echo 'Opening android studio. Now manual tasks are neeeded. For more information read the build-apk.md file'
npx cap open android
