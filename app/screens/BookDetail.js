import React, { Component } from "react";
import {
  ListView,
  Text,
  View,
  StyleSheet
} from "react-native";

import Loader from '../constants/loader'

class BookDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
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
    if (this.props.navigation.state.params.sParameter !== undefined) {
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
    } else {
      fetch(`${this.state.moreBooks}`)
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
      this.props.navigation.setParams({ds: ds.cloneWithRows(data)});
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
      this.props.navigation.setParams({ds: ds.cloneWithRows(responseJson.results)});
      this.setState({
        books: responseJson.results,
        moreBooks: responseJson.next,
        loading: false
      });
    });
    this.props.navigation.setParams({fetchSearchedBooks: this.fetchSearchedBooks});
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params);
  }

  fetchSearchedBooks() {
    this.fetchData(responseJson => {
      let sds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      let filter_search = responseJson.results.filter(o =>
        this.state.books.find(o2 => o.id === o2.id)
      );
      this.setState({
        searched_books: filter_search,
        searchDataSource: sds.cloneWithRows(filter_search)
      });
    });
  }

  render() {
    const { sParameter } = this.props.navigation.state.params;

    if (this.state.loading) {
     return <Loader />
    } else {
      if (sParameter === undefined || sParameter === "") {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <Text style={styles.header}>
              {`${this.props.navigation.state.params.name.toUpperCase()}`}
            </Text>
            <View style={styles.listItem}>
              <ListView
                dataSource={this.props.navigation.state.params.ds}
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
                  this.state.moreBooks!== null ? this.setState({ isLoadingMore: true }, () => this.fetchMore()) : this.setState({ isLoadingMore: false })
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
      } else {
        if(this.state.searched_books === null || this.state.searched_books.length === 0){
          return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text>No results found</Text>
            </View>
          );
        } else {
          return (
            <View style={[styles.container, styles.horizontal]}>
              <Text style={styles.header}>
                {`${this.props.navigation.state.params.name.toUpperCase()}`}
              </Text>
              <View style={styles.listItem}>
                <ListView
                  dataSource={this.state.searchDataSource}
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

export default BookDetail;
