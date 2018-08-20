import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";
import { Tile, List, ListItem } from "react-native-elements";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searched_books: [],
      // sectionBooks: [],
      loading: false
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    await fetch(
      "http://skunkworks.ignitesol.com:8000/books/?topic=" +
        this.props.navigation.state.params.name
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ books: responseJson.results, loading: false });
      })
  }

  async fetchSearchedBooks() {
    await fetch(
      "http://skunkworks.ignitesol.com:8000/books?search=" +
        this.props.navigation.state.params.searchedBooks
    )
      .then(response => response.json())
      .then(responseJson => {
        let filter_search = responseJson.results.filter(o =>
          this.state.books.find(o2 => o.id === o2.id)
        );
        this.setState({ searched_books: filter_search });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#5c57e2" />
        </View>
      );
    } else {
      if (this.props.navigation.getParam("searchedBooks") == undefined) {
        return (
          <View style={styles.mainContainer}>
            <Text
              style={styles.header}
            >{`${this.props.navigation.state.params.name.toUpperCase()}`}</Text>
            <ScrollView>
              <List style={{ flex: 1, flexDirection: "column" }}>
                {this.state.books.map((book, i) => (
                  <ListItem
                    key={i}
                    title={`${book.title}`}
                    subtitle={`${book.authors[0].name}`}
                  />
                ))}
              </List>
            </ScrollView>
          </View>
        );
      } else {
        this.fetchSearchedBooks();
        return (
          <View style={styles.mainContainer}>
            <Text
              style={styles.header}
            >{`${this.props.navigation.state.params.name.toUpperCase()}`}</Text>
            <ScrollView>
              <List style={{ flex: 1, flexDirection: "column" }}>
                {this.state.searched_books.map((book, i) => (
                  <ListItem
                    key={i}
                    title={`${book.title}`}
                    subtitle={`${book.authors[0].name}`}
                  />
                ))}
              </List>
            </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  mainContainer: {
    padding: 10
  },
  header: {
    color: "#5c57e2",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5
  }
});

export default BookDetail;
