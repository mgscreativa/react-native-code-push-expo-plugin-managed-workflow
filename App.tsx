import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import Head from "expo-router/head";
import codePush from "react-native-code-push";

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const ctx = require.context(
    process.env.EXPO_ROUTER_APP_ROOT!,
    true,
    /.*/
);

// Must be exported or Fast Refresh won't update the context
export function App() {
  return (
      <Head.Provider>
        <ExpoRoot context={ctx} />
      </Head.Provider>
  );
}

registerRootComponent(codePush(codePushOptions)(App));
