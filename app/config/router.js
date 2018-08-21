import React from "react";
import { createStackNavigator } from "react-navigation";

import Feed from "../screens/Feed";
import BookDetail from "../screens/BookDetail";

export const Root = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      header: null
    }
  },
  Details: {
    screen: BookDetail,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5c57e2"
      },
      headerTintColor: "white",
    })
  }
});
