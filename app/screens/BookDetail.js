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
      category_books: [],
      searched_books: [],
      // sectionBooks: [],
      loading: false
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const res = await fetch(
      "http://skunkworks.ignitesol.com:8000/books/?topic=" +
        this.props.navigation.state.params.name
    );
    const result = await res.json();
    this.setState({ books: result.results, loading: false });
    //   for(var i=0; i<this.state.books.length;i++){
    //     for(var j=0; j< result.results[i].subjects.length; j++){
    //       if(result.results[i].subjects[j].search("" +this.props.navigation.state.params.name+ "")> -1){

    //         this.setState({
    //           category_books: [...this.state.category_books, result.results[i]],
    //           })
    //           break;
    //       }else{
    //         continue ;
    //       }
    //     }
    // }
    // console.log(this.state.category_books);
    // this.setState({loading: false});
  }
 async fetchSearchedBooks() {
    const res = await fetch(
      "http://skunkworks.ignitesol.com:8000/books?search=" +
        this.props.navigation.state.params.searchedBooks
    );
    const result = await res.json();
    if(result.results.length === 0){
        return false;
    }else{
      this.setState({ searched_books: result.results });
      this.props.navigation.state.params.searchedBooks === undefined; 
      return true
    }
  }

  render() {
    if (this.props.navigation.state.params.searchedBooks !== undefined) {
      this.fetchSearchedBooks();
      if (!this.fetchSearchedBooks()) {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#5c57e2" />
          </View>
        );
      } else {
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
    } else {
      if (this.state.loading) {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#5c57e2" />
          </View>
        );
      } else {
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
