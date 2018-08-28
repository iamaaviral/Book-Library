# book-Library

This repository contains the React Native implementation for the book-Library app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. 

### Prerequisites

The things you need to install to get the project up and running and how to install them

* [NVM v0.33.x](https://github.com/creationix/nvm#install-script) (optional)

  
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
  

* [node v8.11.x](https://nodejs.org/en/download/package-manager/#nvm)

  
  nvm use 8
  

* [XCode](https://developer.apple.com/xcode/) - You can download this from the App store if you are using a mac. The iOS simulator is shipped along with this.

* [Android SDK](https://developer.android.com/studio/) - This can be downloaded and installed using android studio or can be zipped and distributed within the team. Reach out to someone who has been working on React Native for a while.

* Android Emulator - This can be setup using AVD (Android virtual device) manager in Android studio. You can also get the zipped AVD from someone who has the setup. API 27 (Oreo) should be used for the AVD.

* [Expo CLI](https://expo.io/tools#cli)

  
  npm i exp -g
  

* [Expo client app](https://expo.io/tools#client) - This should be installed on all the virtual/physical devices on which the app is supposed to be run.

* [XDE](https://docs.expo.io/versions/v29.0.0/introduction/xde-tour) (optional)

### Installing

* Clone the repo.

  
  git clone https://github.com/srivastavaaviral1/Book-Library.git
  
* Install all the dependencies

  
  cd Book-Library

  npm i
  

### Usage

* Start the packager

  
  npm start
  

* For Android, run the following command after starting the emulator manually or press `a` when QR code is generated.
  
  exp android
  

* For iOS, run the following command to run the app using a simulator manually or press `i` when QR code is generated
  
  exp ios
  

* To run the app on the physical devices, scan the QR code generated while starting the packager in the Expo app. You can also enter the app URL to run the app.

* Use `cmd+D` (for iOS) and `cmd+m` (for Android) for debugger menu. Hot reload, live reload, element inspector can be toggled from here.

* To run the app offline, use `--offline` flag while starting the packager and launching the app.