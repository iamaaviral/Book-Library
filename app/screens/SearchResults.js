import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  StyleSheet
} from "react-native";

import Loader from '../constants/loader'

class SearchResults extends React.Component {
    render() {
        if(this.props.searchedBooks === null){
            return <Loader />
          } else {
            if(this.props.searchedBooks.length === 0){
              return (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Text>No results found</Text>
                </View>
              );
            } else {
              return (
                <View style={[styles.container, styles.horizontal]}>
                  <Text style={styles.header}>
                    {`${this.props.params.name.toUpperCase()}`}
                  </Text>
                  <View style={styles.listItem}>
                    <ListView
                      dataSource={this.props.searchDataSource}
                      renderRow={rowData => {
                        return (
                          <View style={{ flex: 1, borderBottomWidth: 1 }}>
                            <Text style={styles.title}>{rowData.title}</Text>
                            <Text style={styles.subtitle}>
                              {rowData.authors[0] !== undefined ? rowData.authors[0].name : "AUTHOR NOT FOUND"}
                            </Text>
                          </View>
                        );
                  }}
                />
              </View>
            </View>
          );
            }
          }
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
    listItem: {
      flex: 1,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#d6d7da",
      padding: 6
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
    }
  });

export default SearchResults;