import React, { Component } from "react";
import { View, Text, ListView, StyleSheet, Image,Platform } from "react-native";

import Loader from "../constants/loader";

const SearchResults = props => {
  if (!props.searchedBooks) {
    return <Loader />;
  } else {
    if (props.searchedBooks.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>No results found</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <Text style={styles.header}>
            {`${props.params.name.toUpperCase()}`}
          </Text>
          <ListView
            dataSource={props.searchDataSource}
            renderRow={rowData => {
              return (
                <View style={styles.card}>
                  <View style={styles.imageWrapper}>
                    <Image
                      style={{ width: "100%", height: 180, borderRadius: 10 }}
                      source={{
                        uri: !rowData.formats["image/jpeg"]
                          ? "https://via.placeholder.com/70x70.jpg"
                          : rowData.formats["image/jpeg"]
                      }}
                    />
                  </View>
                  <Text style={styles.title}>{rowData.title}</Text>
                  <Text style={styles.subtitle}>
                    {!rowData.authors[0]
                      ? "AUTHOR NOT FOUND"
                      : rowData.authors[0].name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      );
    }
  }
};

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
  header: {
    color: "#5c57e2",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 6
  },
  subtitle: {
    fontSize: 10,
    textAlign: "left",
    marginBottom: 6
  },
  imageWrapper: {
    shadowColor: "#202020",
    ...Platform.select({
      ios: {
        shadowColor: "grey",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 2
      },
      android: {
        elevation: 10,
        borderRadius: 2
      }
    })
  },
  listView: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  card: {
    // width: (width / 2) - 25,
    width: 150,
    marginLeft: 15,
    marginTop: 15
  }
});

export default SearchResults;
