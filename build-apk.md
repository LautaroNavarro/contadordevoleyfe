# Build .APK

We build an .apk file using ionic + capacitor + android studio.

The steps were followed from this post https://medium.com/how-to-react/convert-your-existing-react-js-app-to-android-or-ios-app-using-the-ionic-capacitor-a127deda75bd

## Requirements
In order to build the apk file you need the following deps
* Ionic
* Android studio
* Npm
* Node

## Steps

### Create the react optimized production build
`npm run build`

### Install ionic globally
`npm install -g @ionic/cli`

### Install the capacitor core in our project
`npm install @capacitor/core --save`

### Install the capacitor cli in our project
`npm install @capacitor/cli --save`

### Create the android APP
(This will raise an error if the android directory already exists)

`ionic capacitor add android`

### Replace resources (splash and icon) on android APP
`rm -r ./android/app/src/main/res/ && cp ./resources ./android/app/src/main/res`

### Open the android project in android studio
`npx cap open android`

### Build the APK file from Android studio
Now open the build menu from the android studio and build your apk file.

## Release process
The release process is still not defined, but we are planning on release the app to playstore.