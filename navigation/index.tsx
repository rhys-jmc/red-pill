/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { useColorScheme } from "../context";
import { NotFoundScreen } from "../screens";

import { BottomTabNavigator } from "./bottom-tab-navigator";
import { LinkingConfiguration } from "./linking-configuration";

import type { RootStackParamList } from "./types";

export const Navigation = (): JSX.Element => (
  <NavigationContainer
    linking={LinkingConfiguration}
    theme={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}
  >
    <RootNavigator />
  </NavigationContainer>
);

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = (): JSX.Element => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Root" component={BottomTabNavigator} />
    <Stack.Screen
      name="NotFound"
      component={NotFoundScreen}
      options={{ title: "Oops!" }}
    />
  </Stack.Navigator>
);
