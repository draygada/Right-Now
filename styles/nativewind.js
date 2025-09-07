import { registerRootComponent } from "expo";
import { NativeWindStyleSheet } from "nativewind";

// Import the main App component
import App from "./App";

// Configure NativeWind
NativeWindStyleSheet.setOutput({
  default: "native",
});

// Register the main component
registerRootComponent(App);
