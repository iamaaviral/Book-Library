import React from "react";
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
      headerRight: (
        <Button
          onPress={() => navigation.setParams({"sParameter": undefined})}
          title="cancel"
          color="#fff"
          backgroundColor= "transparent"
        />
      ),
      headerTitle: (
          <SearchBar
            containerStyle={{
              backgroundColor: "transparent",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              width: 300
            }}
            inputStyle={{ backgroundColor: "#5c57e2", color: "white", marginLeft: -10 }}
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
      )
    })
  }
});
