import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";

class Loader extends React.Component {
    render() {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#5c57e2" />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "column",
      justifyContent: "space-around",
      padding: 10
    },
})

export default Loader;