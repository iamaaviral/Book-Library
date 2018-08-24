import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  StyleSheet
} from "react-native";

import Loader from '../constants/loader'

class BookList extends React.Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
              <Text style={styles.header}>
                {`${this.props.params.state.params.name.toUpperCase()}`}
              </Text>
              <View style={styles.listItem}>
                <ListView
                  dataSource={this.props.params.state.params.ds}
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
                  onEndReached={() => {
                    this.props.moreBooks!== null ? this.setState({ isLoadingMore: true }, () => this.props.fetchMore()) : this.setState({ isLoadingMore: false })
                    }
                  }
                  renderFooter={() => {
                    if(this.state.isLoadingMore){
                    return (
                      this.state.isLoadingMore && (<Loader />)
                    );} else{
                      return (
                        this.state.isLoadingMore && (
                          <View style={{ flex: 1 }}>
                              <Text>NO MORE BOOKS FOUND !!</Text>
                          </View>
                        )
                      );
                    }
                  }}
                />
              </View>
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


export default BookList;