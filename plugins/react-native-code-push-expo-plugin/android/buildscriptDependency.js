"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidBuildscriptDependency = void 0;
const config_plugins_1 = require("expo/config-plugins");
/**
 * Update `<project>/build.gradle` by adding the codepush.gradle file
 * as an additional build task definition underneath react.gradle
 */
function applyImplementation(appBuildGradle) {
    const codePushImplementation = `apply from: new File(["node", "--print", "require.resolve('react-native-code-push/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getAbsolutePath() + "/android/codepush.gradle"`;
    // Make sure the project does not have the dependency already
    if (!appBuildGradle.includes(codePushImplementation)) {
        const reactNativeFileClassGradleInclude = `'apply from: new File(reactNativeRoot, "react.gradle")`;
        if (appBuildGradle.includes(reactNativeFileClassGradleInclude)) {
            return appBuildGradle.replace(reactNativeFileClassGradleInclude, `${reactNativeFileClassGradleInclude}\n${codePushImplementation}`);
        }
        const reactNativeRawGradleInclude = `apply from: "../../node_modules/react-native/react.gradle"`;
        if (appBuildGradle.includes(reactNativeRawGradleInclude)) {
            return appBuildGradle.replace(reactNativeRawGradleInclude, `${reactNativeRawGradleInclude}\n${codePushImplementation}`);
        }
        const reactNative71Include = `apply from: new File(["node", "--print", "require.resolve('@react-native-community/cli-platform-android/package.json')"].execute(null, rootDir).text.trim(), "../native_modules.gradle");`;
        if (appBuildGradle.includes(reactNative71Include)) {
            return appBuildGradle.replace(reactNative71Include, `${reactNative71Include}\n${codePushImplementation}`);
        }
    }
    return appBuildGradle;
}
const withAndroidBuildscriptDependency = (config) => {
    return (0, config_plugins_1.withAppBuildGradle)(config, (config) => {
        config.modResults.contents = applyImplementation(config.modResults.contents);
        return config;
    });
};
exports.withAndroidBuildscriptDependency = withAndroidBuildscriptDependency;
