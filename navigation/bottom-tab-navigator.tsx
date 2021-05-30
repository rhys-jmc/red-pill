/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import { theme } from "../constants/colors";
import { useColorScheme } from "../hooks/use-color-scheme";
import { TabOneScreen } from "../screens/tab-one-screen";
import { TabTwoScreen } from "../screens/tab-two-screen";

import type {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
} from "../types";
import type { ComponentProps } from "react";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = (): JSX.Element => {
  const colorScheme = useColorScheme();

  const tabBarIcon = useCallback(
    ({ color }) => <TabBarIcon name="ios-code" color={color} />,
    []
  );

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: theme[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{ tabBarIcon }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{ tabBarIcon }}
      />
    </BottomTab.Navigator>
  );
};

type TabBarIconProps = {
  readonly name: ComponentProps<typeof Ionicons>["name"];
  readonly color: string;
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarIcon = (props: TabBarIconProps): JSX.Element => (
  <Ionicons size={30} style={styles.tabBarIcon} {...props} />
);

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

const TabOneNavigator = (): JSX.Element => (
  <TabOneStack.Navigator>
    <TabOneStack.Screen
      name="TabOneScreen"
      component={TabOneScreen}
      options={{ headerTitle: "Tab One Title" }}
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

const styles = StyleSheet.create({ tabBarIcon: { marginBottom: -3 } });
