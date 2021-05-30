/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { theme } from "../constants";
import { useColorScheme } from "../hooks";
import { DiscoverScreen } from "../screens/discover-screen";
import { TabTwoScreen } from "../screens/tab-two-screen";

import type {
  BottomTabParamList,
  DiscoverParamList,
  TabTwoParamList,
} from "./types";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const discoverTabBarIcon: BottomTabNavigationOptions["tabBarIcon"] = (
  props
) => <Ionicons name="search-outline" {...props} />;

const listTabBarIcon: BottomTabNavigationOptions["tabBarIcon"] = (props) => (
  <Ionicons name="list-outline" {...props} />
);

export const BottomTabNavigator = (): JSX.Element => (
  <BottomTab.Navigator
    initialRouteName="Discover"
    tabBarOptions={{ activeTintColor: theme[useColorScheme()].tint }}
  >
    <BottomTab.Screen
      name="Discover"
      component={DiscoverNavigator}
      options={{ tabBarIcon: discoverTabBarIcon }}
    />
    <BottomTab.Screen
      name="TabTwo"
      component={TabTwoNavigator}
      options={{ tabBarIcon: listTabBarIcon }}
    />
  </BottomTab.Navigator>
);

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<DiscoverParamList>();

const DiscoverNavigator = (): JSX.Element => (
  <TabOneStack.Navigator>
    <TabOneStack.Screen
      name="DiscoverScreen"
      component={DiscoverScreen}
      options={{ headerTitle: "Discover" }}
    />
  </TabOneStack.Navigator>
);

const TabTwoStack = createStackNavigator<TabTwoParamList>();

const TabTwoNavigator = (): JSX.Element => (
  <TabTwoStack.Navigator>
    <TabTwoStack.Screen
      name="TabTwoScreen"
      component={TabTwoScreen}
      options={{ headerTitle: "Tab Two Title" }}
    />
  </TabTwoStack.Navigator>
);
