/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { theme } from "../constants";
import { useColorScheme } from "../context";
import {
  DiscoverScreen,
  MovieDetailsScreen,
  PersonMoviesScreen,
  ListsScreen,
} from "../screens";

import type {
  BottomTabParamList,
  DiscoverStackParamList,
  ListsStackParamList,
} from "./types";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const discoverTabBarIcon: BottomTabNavigationOptions["tabBarIcon"] = (
  props
) => <Ionicons name="search-outline" {...props} />;

const listsTabBarIcon: BottomTabNavigationOptions["tabBarIcon"] = (props) => (
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
      name="Lists"
      component={ListsNavigator}
      options={{ tabBarIcon: listsTabBarIcon, tabBarLabel: "Lists" }}
    />
  </BottomTab.Navigator>
);

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DiscoverStack = createStackNavigator<DiscoverStackParamList>();

const DiscoverNavigator = (): JSX.Element => (
  <DiscoverStack.Navigator>
    <DiscoverStack.Screen
      name="DiscoverScreen"
      component={DiscoverScreen}
      options={{ headerTitle: "Discover" }}
    />
    <DiscoverStack.Screen
      name="MovieDetailsScreen"
      component={MovieDetailsScreen}
    />
    <DiscoverStack.Screen
      name="PersonMoviesScreen"
      component={PersonMoviesScreen}
    />
  </DiscoverStack.Navigator>
);

const ListsStack = createStackNavigator<ListsStackParamList>();

const ListsNavigator = (): JSX.Element => (
  <ListsStack.Navigator>
    <ListsStack.Screen
      name="ListsScreen"
      component={ListsScreen}
      options={{ headerTitle: "Lists" }}
    />
    <ListsStack.Screen
      name="MovieDetailsScreen"
      component={MovieDetailsScreen}
    />
  </ListsStack.Navigator>
);
