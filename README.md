# Demo repo for react-native-code-push-expo-plugin using Expo Development Client
This is a demo repo implementing CodePush for Expo dev client using [react-native-code-push-expo-plugin](https://github.com/deggertsen/react-native-code-push-expo-plugin/) config plugin.

> :information_source: **Note** <br>
**This will not work on Expo Go** projects, it will only work for **Expo Development Client** projects.

## Setup
* Checkout repo
* Run `npm install`
* Do CodePush magic to create a deployment and get the keys ([Useful CodePush commands](#useful-codepush-commands))
* Modify **CodePushDeploymentKey** with real deployment keys for Android or iOS, or both if you need
* Build the dev client or the production app (need to have your local dev environment setup, more here [Setting up the development environment](https://reactnative.dev/docs/environment-setup)):
  * **Development client Android**: `npx eas build --profile development --platform android --clear-cache --local`
  * **Development client iOS**: `npx eas build --profile development --platform ios --clear-cache --local`
  * **Production Android**: `npx eas build --profile production --platform android --clear-cache --local`
  * **Production iOS** (you need to submit this to TestFlight to test in devices): `npx eas build --profile production --platform ios --clear-cache --local`
  * **Production Android APK** (to test in devices): `npx eas build --profile production-android-apk --platform android --clear-cache --local`

After you have your app running on your device, try to change something in code and then upload a CodePush release ([Create deployments](#create-deployments)), wait a minute and then restart the app os set it to background and then foreground it again.

At this point you should be able to tweak the project, analyze it and set it up in your production project, maybe implementing manual CodePush updates.

## Known issues
At this point, CodePush seems to dislike local imports that use **@/** instead of the good old *./*. For this to work, you need to change all **@/** imports with **./** paths. If you know how to fix this, please tell or send a PR. Issue reported [here](https://github.com/microsoft/appcenter-cli/issues/2417)

### Error log:

>     Running "react-native bundle" command:
>
>     node node_modules/.bin/react-native bundle --assets-dest /tmp/code-push202378-13714-1aqtsrk.ef28/CodePush --bundle-output /tmp/code-push202378-13714-1aqtsrk.ef28/CodePush/main.jsbundle --dev false --entry-file App.tsx --platform ios
>     warn From React Native 0.72, your metro.config.js file should extend'@react-native/metro-config'. Please see the React Native 0.72 changelog, or copy the template at:
>     https://github.com/facebook/react-native/blob/main/packages/react-native/template/metro.config.js
>     warn Falling back to internal defaults.
>     Welcome to Metro v0.76.7
>     Fast - Scalable - Integrated
>
>     error Unable to resolve module @/components/EditScreenInfo from /media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/app/(tabs)/two.tsx: @/components/EditScreenInfo could not be found within the project or in these directories:
>     node_modules
>     1 | import { StyleSheet } from 'react-native';
>     2 |
>
>         3 | import EditScreenInfo from '@/components/EditScreenInfo';
>         | ^
>         4 | import { Text, View } from '@/components/Themed';
>         5 |
>         6 | export default function TabTwoScreen() {.
>         Error: Unable to resolve module @/components/EditScreenInfo from /media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/app/(tabs)/two.tsx: @/components/EditScreenInfo could not be found within the project or in these directories:
>         node_modules
>         1 | import { StyleSheet } from 'react-native';
>         2 |
>         3 | import EditScreenInfo from '@/components/EditScreenInfo';
>         | ^
>         4 | import { Text, View } from '@/components/Themed';
>         5 |
>         6 | export default function TabTwoScreen() {
>         at ModuleResolver.resolveDependency (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/node-haste/DependencyGraph/ModuleResolution.js:139:15)
>         at DependencyGraph.resolveDependency (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/node-haste/DependencyGraph.js:277:43)
>         at Object.resolve (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/lib/transformHelpers.js:169:21)
>         at Graph._resolveDependencies (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/DeltaBundler/Graph.js:473:35)
>         at Graph._processModule (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/DeltaBundler/Graph.js:261:38)
>         at processTicksAndRejections (node:internal/process/task_queues:96:5)
>         at async Graph._addDependency (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/DeltaBundler/Graph.js:372:20)
>         at async Promise.all (index 2)
>         at async Graph._processModule (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/DeltaBundler/Graph.js:322:5)
>         at async Graph._addDependency (/media/martinb/SSD1TB/dev/Proyectos-Full-Stack/react-native-code-push-expo-plugin-managed-workflow/node_modules/metro/src/DeltaBundler/Graph.js:372:20)
>         info Run CLI with --verbose flag for more details.
>         Error: Failed to release a CodePush update.

## Enable [react-native-code-push-expo-plugin](https://github.com/deggertsen/react-native-code-push-expo-plugin/) in your project
To enable the plugin in your project, you need to copy `/plugins/react-native-code-push-expo-plugin` and set the plugin config in your app.json, app.config.json or app.config.js. If you don't need Android or iOS CodePush support simply remove the Android or iOS section. More up to date plugin code may be in the original repo [react-native-code-push-expo-plugin](https://github.com/deggertsen/react-native-code-push-expo-plugin/)

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
