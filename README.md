# Demo repo for react-native-code-push-expo-plugin using Expo and dev client
This is a demo repo implementing CodePush for Expo dev client using [react-native-code-push-expo-plugin](https://github.com/deggertsen/react-native-code-push-expo-plugin/) config plugin. **This will not work on Expo Go** projects, it will only work for **Expo Development Client** projects.

## Setup
* Checkout repo
* Run `npm install`
* Do CodePush magic to create a deployment and get the keys ([Useful CodePush commands](#useful-codepush-commands))
* Modify app.json **CodePushDeploymentKey** with real deployment keys for Android or iOS, or both if you need
* Build the dev client or the production app (need to have your local dev environment setup, more here [Setting up the development environment](https://reactnative.dev/docs/environment-setup)):
    * **Development client Android**: `npx eas build --profile development --platform android --clear-cache --local`
    * **Development client iOS**: `npx eas build --profile development --platform ios --clear-cache --local`
    * **Production Android**: `npx eas build --profile production --platform android --clear-cache --local`
    * **Production iOS** (you need to submit this to TestFlight to test in devices): `npx eas build --profile production --platform ios --clear-cache --local`
    * **Production Android APK** (to test in devices): `npx eas build --profile production-android-apk --platform android --clear-cache --local`

After you have your app running on your device, try to change something in code and then upload a CodePush release [Create deployments](#create-deployments), wait a minute and then restart the app os set it to background and the foreground it again. At this point you should be able to tweak the project, analyze it and set it uo in your production project maybe implementing manual CodePush updates. To enable the plugin in your project, you need to copy `/plugins/react-native-code-push-expo-plugin` and set the plugin config in your app.json, app.config.json or app.config.js. If you don't need Android or iOS CodePush support simply remove the Android or iOS section.

```javascript
"plugins": [
  [
    "./plugins/react-native-code-push-expo-plugin",
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

* **Android deployment**: `appcenter codepush deployment add -a YOURACCOUNT/android-expo-code-push-plugin-managed-workflow "Development"`
* **iOS deployment**: `appcenter codepush deployment add -a YOURACCOUNT/ios-expo-code-push-plugin-managed-workflow "Development"`

### Get deployment keys
Adjust -a param as you need

* **Android**: `appcenter codepush deployment list -a YOURACCOUNT/android-expo-code-push-plugin-managed-workflow --displayKeys`
* **iOS**: `appcenter codepush deployment list -a YOURACCOUNT/ios-expo-code-push-plugin-managed-workflow --displayKeys`

### Send a bundle update (release)
Adjust -a, --deployment-name, --entry-file App.tsx, --use-hermes and --target-binary-version params as you need. See CodePush docs [here](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli) for more info
 
* **Android**: `appcenter codepush release-react -a YOURACCOUNT/android-expo-code-push-plugin-managed-workflow --deployment-name "Development" --entry-file App.tsx --use-hermes --target-binary-version "1.0.0"`
* **iOS**: `appcenter codepush release-react -a YOURACCOUNT/ios-expo-code-push-plugin-managed-workflow --deployment-name "Development" --entry-file App.tsx --use-hermes --target-binary-version "1.0.0"`
