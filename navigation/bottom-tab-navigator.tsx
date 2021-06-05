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
import {
  DiscoverScreen,
  MovieDetailsScreen,
  UpNextScreen,
  WatchedScreen,
} from "../screens";

import type {
  BottomTabParamList,
  DiscoverParamList,
  UpNextParamList,
  WatchedParamList,
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
      name="UpNext"
      component={UpNextNavigator}
      options={{ tabBarIcon: listTabBarIcon, tabBarLabel: "Up Next" }}
    />
    <BottomTab.Screen
      name="Watched"
      component={WatchedNavigator}
      options={{ tabBarIcon: listTabBarIcon, tabBarLabel: "Watched" }}
    />
  </BottomTab.Navigator>
);

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DiscoverStack = createStackNavigator<DiscoverParamList>();

const DiscoverNavigator = (): JSX.Element => (
  <DiscoverStack.Navigator>
    <DiscoverStack.Screen
      name="DiscoverScreen"
      component={DiscoverScreen}
      options={{ headerTitle: "Discover" }}
    />
  </DiscoverStack.Navigator>
);

const UpNextStack = createStackNavigator<UpNextParamList>();

const UpNextNavigator = (): JSX.Element => (
  <UpNextStack.Navigator>
    <UpNextStack.Screen
      name="UpNextScreen"
      component={UpNextScreen}
      options={{ headerTitle: "Up Next" }}
    />
    <UpNextStack.Screen
      name="MovieDetailsScreen"
      component={MovieDetailsScreen}
    />
  </UpNextStack.Navigator>
);

const WatchedStack = createStackNavigator<WatchedParamList>();

const WatchedNavigator = (): JSX.Element => (
  <WatchedStack.Navigator>
    <WatchedStack.Screen
      name="WatchedScreen"
      component={WatchedScreen}
      options={{ headerTitle: "Watched" }}
    />
    <WatchedStack.Screen
      name="MovieDetailsScreen"
      component={MovieDetailsScreen}
    />
  </WatchedStack.Navigator>
);
