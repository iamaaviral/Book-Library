import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  StyleSheet,
  Image
} from "react-native";

import Loader from '../constants/loader'

const SearchResults= props => {
        if(!props.searchedBooks){
            return <Loader />
          } else {
            if(props.searchedBooks.length === 0){
              return (
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Text>No results found</Text>
                </View>
              );
            } else {
              return (
                <View style={[styles.container, styles.horizontal]}>
                  <Text style={styles.header}>
                    {`${props.params.name.toUpperCase()}`}
                  </Text>
                  <View style={styles.listItem}>
                    <ListView
                      dataSource={props.searchDataSource}
                      renderRow={rowData => {
                        return (
                          <View style={{ flex: 1, borderBottomWidth: 1 }}>
                          <View style={styles.imageWrapper}>
                           <Image
                             style={{ width: 70, height: 70 }}
                             source={{
                               uri: !rowData.formats['image/jpeg']
                                 ? "https://via.placeholder.com/70x70.jpg"
                                 : rowData.formats['image/jpeg']
                             }}
                           />
                           </View>
                            <Text style={styles.title}>{rowData.title}</Text>
                            <Text style={styles.subtitle}>
                              {!rowData.authors[0] ? "AUTHOR NOT FOUND" : rowData.authors[0].name}
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
    },
    imageWrapper: {
      padding: 5
    }
  });

export default SearchResults;