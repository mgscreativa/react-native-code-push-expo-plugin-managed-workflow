// `@expo/metro-runtime` MUST be the first import to ensure Fast Refresh works
// on web.
import "@expo/metro-runtime";

// This file should only import and register the root. No components or exports
// should be added here.
import { renderRootComponent } from "expo-router/src/renderRootComponent";

import { App } from "expo-router/_app";
import codePush from "react-native-code-push";

/**
 * @todo: Monitor expo-router/entry.js for possible changes or updates!
 */

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

renderRootComponent(codePush(codePushOptions)(App));
