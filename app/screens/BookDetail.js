import React, { Component } from "react";
import {
  ListView,
  Text,
  View,
  StyleSheet,
  Image,
  Platform
} from "react-native";

import Loader from "../constants/loader";
import SearchResults from "./SearchResults";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDataSource: null,
      books: null,
      searched_books: null,
      loading: true,
      isLoadingMore: false,
      moreBooks: `http://skunkworks.ignitesol.com:8000/books/?topic=${
        this.props.navigation.state.params.name
      }`
    };
    this.fetchMore = this.fetchMore.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchSearchedBooks = this.fetchSearchedBooks.bind(this);
  }

  fetchData(callback) {
    if (!this.props.navigation.state.params.sParameter) {
      fetch(`${this.state.moreBooks}`)
        .then(response => response.json())
        .then(callback)
        .catch(error => {
          console.error(error);
        });
    } else {
      fetch(
        `http://skunkworks.ignitesol.com:8000/books/?topic=${
          this.props.navigation.state.params.name
        }&search=${this.props.navigation.state.params.sParameter}`
      )
        .then(response => response.json())
        .then(callback)
        .catch(error => {
          console.error(error);
        });
    }
  }

  fetchMore() {
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      const data = this.state.books.concat(responseJson.results);
      this.props.navigation.setParams({ ds: ds.cloneWithRows(data) });
      this.setState({
        books: data,
        isLoadingMore: false,
        moreBooks: responseJson.next
      });
    });
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.props.navigation.setParams({
        ds: ds.cloneWithRows(responseJson.results)
      });
      this.setState({
        books: responseJson.results,
        moreBooks: responseJson.next,
        loading: false
      });
    });
    this.props.navigation.setParams({
      fetchSearchedBooks: this.fetchSearchedBooks
    });
  }

  fetchSearchedBooks() {
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      let filter_search = responseJson.results.filter(o =>
        this.state.books.find(o2 => o.id === o2.id)
      );
      this.setState({
        searched_books: filter_search,
        searchDataSource: ds.cloneWithRows(filter_search)
      });
    });
  }

  render() {
    const params = this.props.navigation.state.params;
    const { sParameter } = this.props.navigation.state.params;

    if (this.state.loading) {
      return <Loader />;
    } else {
      if (!sParameter || sParameter === "") {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <Text style={styles.header}>{`${params.name.toUpperCase()}`}</Text>
            <ListView
              contentContainerStyle={styles.listView}
              dataSource={params.ds}
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
              onEndReached={() => {
                this.state.moreBooks !== null
                  ? this.setState({ isLoadingMore: true }, () =>
                      this.fetchMore()
                    )
                  : this.setState({ isLoadingMore: false });
              }}
              renderFooter={() => {
                if (this.state.isLoadingMore) {
                  return this.state.isLoadingMore && <Loader />;
                } else {
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
        );
      } else {
        return (
          <SearchResults
            searchedBooks={this.state.searched_books}
            params={this.props.navigation.state.params}
            searchDataSource={this.state.searchDataSource}
          />
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
    justifyContent: "space-evenly",
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
    width: 150,
    marginLeft: 15,
    marginTop: 15
  }
});

export default BookDetail;
