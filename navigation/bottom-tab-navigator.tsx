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
  SearchScreen,
  MovieDetailsScreen,
  PersonMoviesScreen,
  ListsScreen,
} from "../screens";

import type {
  BottomTabParamList,
  SearchStackParamList,
  ListsStackParamList,
} from "./types";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const searchTabBarIcon: BottomTabNavigationOptions["tabBarIcon"] = (props) => (
  <Ionicons name="search-outline" {...props} />
);

const listsTabBarIcon: BottomTabNavigationOptions["tabBarIcon"] = (props) => (
  <Ionicons name="list-outline" {...props} />
);

export const BottomTabNavigator = (): JSX.Element => (
  <BottomTab.Navigator
    initialRouteName="Search"
    tabBarOptions={{ activeTintColor: theme[useColorScheme()].tint }}
  >
    <BottomTab.Screen
      name="Search"
      component={SearchNavigator}
      options={{ tabBarIcon: searchTabBarIcon }}
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
const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchNavigator = (): JSX.Element => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{ headerTitle: "Search" }}
    />
    <SearchStack.Screen
      name="MovieDetailsScreen"
      component={MovieDetailsScreen}
    />
    <SearchStack.Screen
      name="PersonMoviesScreen"
      component={PersonMoviesScreen}
    />
  </SearchStack.Navigator>
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
