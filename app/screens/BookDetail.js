import React, { Component } from "react";
import {
  ListView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { SearchBar } from "react-native-elements";

class BookDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
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
          clearIcon={{ color: "white" }}
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
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
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
      const data = this.state.books.concat(responseJson.results);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
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
      this.setState({
        dataSource: ds.cloneWithRows(responseJson.results),
        books: responseJson.results,
        moreBooks: responseJson.next,
        loading: false
      });
      this.props.navigation.setParams({fetchSearchedBooks: this.fetchSearchedBooks});
    });
    console.log( this.props.navigation.state.params.sParameter);
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
        dataSource: ds.cloneWithRows(filter_search)
      });
    });
  }

  render() {
    const { sParameter } = this.props.navigation.state.params;

    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#5c57e2" />
        </View>
      );
    } else {
      if (sParameter === undefined) {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <Text style={styles.header}>
              {`${this.props.navigation.state.params.name.toUpperCase()}`}
            </Text>
            <View style={styles.listItem}>
              <ListView
                dataSource={this.state.dataSource}
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
                    this.state.isLoadingMore && (
                      <View style={{ flex: 1 }}>
                        <ActivityIndicator size="large" color="#5c57e2" />
                      </View>
                    )
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
                  dataSource={this.state.dataSource}
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
