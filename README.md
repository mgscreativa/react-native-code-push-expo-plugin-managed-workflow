# Demo repo for react-native-code-push-plugin using Expo Development Client
This is a demo repo implementing CodePush for Expo dev client using [react-native-code-push-plugin](https://github.com/GSTJ/react-native-code-push-plugin) config plugin.

> :information_source: **Note** <br>
**This will not work on Expo Go** projects, it will only work for **Expo Development Client** projects.

## Setup
* Checkout repo
* Run `npm install`
* Do CodePush magic to create a deployment and get the keys ([Useful CodePush commands](#useful-codepush-commands))
* Modify **CodePushDeploymentKey** with real deployment keys for Android or iOS, or both if you need
* Build the dev client or the production app (for local builds you need to have your local dev environment setup and add `--local` to this commands, more here [Setting up the development environment](https://reactnative.dev/docs/environment-setup)):
  * **Development client Android**: `npx eas build --profile development --platform android --clear-cache`
  * **Development client iOS**: `npx eas build --profile development --platform ios --clear-cache`
  * **Production Android**: `npx eas build --profile production --platform android --clear-cache`
  * **Production iOS** (you need to submit this to TestFlight to test in devices): `npx eas build --profile production --platform ios --clear-cache`
  * **Production Android APK** (to test in devices): `npx eas build --profile production-android-apk --platform android --clear-cache`

After you have your app running on your device, try to change something in code (ie: edit `setTimesPressed` function) and then upload a CodePush release (see [Create deployments](#create-deployments)), wait a minute and then restart the app or set it to background and then foreground it again.

At this point you should be able to tweak the project, analyze it and set it up in your production project, maybe implementing manual CodePush updates.

## Known issues
At this point, CodePush seems to dislike local imports that use **@/** instead of the good old *./*. For this to work, you need to change all **@/** imports with **./** paths. If you know how to fix this, please tell or send a PR. Issue reported [here](https://github.com/microsoft/appcenter-cli/issues/2417)

## Enable [react-native-code-push-plugin](https://github.com/GSTJ/react-native-code-push-plugin#add-the-package-to-your-npm-dependencies) in your project
To enable the plugin in your project, you need to install it with `npm install -s react-native-code-push-plugin` and set the plugin config in your app.json, app.config.json or app.config.js. If you don't need Android or iOS CodePush support simply remove the Android or iOS section.

```javascript
"plugins": [
  [
    "react-native-code-push-plugin",
    {
      "android": {
        "CodePushDeploymentKey": ""
      },
      "ios": {
        "CodePushDeploymentKey": ""
      }
    }
  ]
]
```

## Support the PR on react-native-code-push repo
Currently, there's an open PR to have this plugin out of the box in react-native-code-push package but still waiting for approval to merge, if you can, write a comment asking for this plugin to be added to the package. Here's the PR link [Expo plugin to simplify installation with expo](https://github.com/microsoft/react-native-code-push/pull/2415)

## Useful CodePush commands

### CodePush documentation
[Releasing CodePush updates using the App Center CLI](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli)

### Install app center cli
`npm install -g appcenter-cli`

### Login to your app center account
`appcenter login`

### Create an app center app
Adjust --display-name --release-type params as you need

* **Android development**: `appcenter apps create --platform React-Native --os Android --display-name "android-expo-code-push-plugin-managed-workflow" --release-type Development`
* **iOS development**: `appcenter apps create --platform React-Native --os iOS --display-name "ios-expo-code-push-plugin-managed-workflow" --release-type Development`

### List app center apps
`appcenter apps list`

### Create deployments
Here you get the deployment key. Adjust -a and Development params as you need

* **Android deployment**: `appcenter codepush release-react -a YOURACCOUNT/android-expo-code-push-plugin-managed-workflow --deployment-name 'Development' --entry-file 'node_modules/expo/AppEntry.js' --use-hermes --target-binary-version '1.0.1'`
* **iOS deployment**: `appcenter codepush release-react -a YOURACCOUNT/ios-expo-code-push-plugin-managed-workflow --deployment-name 'Development' --entry-file 'node_modules/expo/AppEntry.js' --use-hermes --target-binary-version '1.0.1'`

### Get deployment keys
Adjust -a param as you need

* **Android**: `appcenter codepush deployment list -a YOURACCOUNT/android-expo-code-push-plugin-managed-workflow --displayKeys`
* **iOS**: `appcenter codepush deployment list -a YOURACCOUNT/ios-expo-code-push-plugin-managed-workflow --displayKeys`

### Send a bundle update (release)
Adjust -a, --deployment-name, --entry-file **should be pointed at your file stated in main in package.json. In this repo is `"main": "App.tsx"`**, --use-hermes and --target-binary-version params as you need. See CodePush docs [here](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli) for more info

* **Android**: `appcenter codepush release-react -a YOURACCOUNT/android-expo-code-push-plugin-managed-workflow --deployment-name "Development" --entry-file App.tsx --use-hermes --target-binary-version "1.0.0"`
* **iOS**: `appcenter codepush release-react -a YOURACCOUNT/ios-expo-code-push-plugin-managed-workflow --deployment-name "Development" --entry-file App.tsx --use-hermes --target-binary-version "1.0.0"`
