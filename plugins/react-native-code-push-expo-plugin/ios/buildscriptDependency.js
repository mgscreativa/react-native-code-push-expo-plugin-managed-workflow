"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIosBuildscriptDependency = void 0;
const config_plugins_1 = require("expo/config-plugins");
// Pass `<string>` to specify that this plugin requires a string property.
const withIosBuildscriptDependency = (config, props) => {
    if (!props.ios.CodePushDeploymentKey)
        return config;
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        config.modResults.CodePushDeploymentKey = props.ios.CodePushDeploymentKey;
        return config;
    });
};
exports.withIosBuildscriptDependency = withIosBuildscriptDependency;
