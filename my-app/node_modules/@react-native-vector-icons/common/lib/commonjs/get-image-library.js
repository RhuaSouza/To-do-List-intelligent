"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureGetImageAvailable = void 0;
// eslint-disable-next-line import/no-mutable-exports
let NativeIconAPI = null;
try {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies,@typescript-eslint/no-require-imports
  NativeIconAPI = require('@react-native-vector-icons/get-image');
} catch {
  // No warning at this stage
}
const ensureGetImageAvailable = () => {
  if (!NativeIconAPI) {
    throw new Error('Could not import @react-native-vector-icons/get-image, did you install it? It is required for getImageSource*');
  }
  NativeIconAPI.ensureNativeModuleAvailable();
  return NativeIconAPI;
};
exports.ensureGetImageAvailable = ensureGetImageAvailable;
//# sourceMappingURL=get-image-library.js.map