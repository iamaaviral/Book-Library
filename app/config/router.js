import React from "react";
import {
  View,Platform,
} from "react-native";

import { createStackNavigator } from "react-navigation";
import { SearchBar, Button } from "react-native-elements";

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
      // headerRight: (
      // ),
      headerTitle: (
        <View style={{ flex: 1, flexDirection:'row', alignItems: 'center'}}>
          <View style={{ flex: 1}}>
          <SearchBar
            containerStyle={{
              backgroundColor: "transparent",
              borderTopColor: "transparent",
              borderBottomColor: "transparent"
            }}
            inputStyle={{ backgroundColor: "#5c57e2", color: "white" }}
            placeholderTextColor={"#9877f4"}
            noIcon
            placeholder={"Search"}
            onChangeText={text => navigation.setParams({ text })}
            onSubmitEditing={async () => {
              await navigation.setParams({
                sParameter: encodeURIComponent(
                  navigation.state.params.text.trim()
                )
              }); 
              navigation.state.params.fetchSearchedBooks();
            }}
          />
          </View>
          <Button
            onPress={() => navigation.setParams({"sParameter": undefined})}
            title="cancel"
            color="#fff"
            backgroundColor= "transparent"
          />
        </View>
      )
    })
  }
});
