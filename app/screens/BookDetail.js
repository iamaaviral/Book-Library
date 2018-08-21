import React, { Component } from "react";
import {
  ListView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {List, ListItem } from "react-native-elements";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      books: null,
      searched_books: null,
      loading: true,
      isLoadingMore: false,
      moreBooks: 1
    };
    this.fetchMore = this.fetchMore.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchSearchedBooks = this.fetchSearchedBooks.bind(this);
  }

  fetchData(callback) {
    const params = this.state.moreBooks;
    const search = this.props.navigation.getParam("searchedBooks") !== undefined
    ? `&search=${this.props.navigation.getParam("searchedBooks")}`
    : "";
  fetch(`http://skunkworks.ignitesol.com:8000/books/?page=${params}&topic=${this.props.navigation.state.params.name}${search}`)
      .then(response => response.json())
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  fetchMore() {
    this.fetchData(responseJson => {
      const data = this.state.books.concat(responseJson.results);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoadingMore: false,
        books: data,
        moreBooks: this.state.moreBooks
      });
    });
  }

 componentDidMount() {
    this.setState({ loading: true });
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
        this.setState({
        dataSource: ds.cloneWithRows(responseJson.results),
        books: responseJson.results,
        loading: false
      });
    })
    console.log("Hooray");
  }

  fetchSearchedBooks() {
    this.fetchData(responseJson => {     
      let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log(responseJson.results);
        let filter_search = responseJson.results.filter(o =>
          this.state.books.find(o2 => o.id === o2.id)
        );
        
    console.log(filter_search);
        this.setState({ 
          searched_books: filter_search,        
          dataSource: ds.cloneWithRows(filter_search),
        });
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#5c57e2" />
        </View>
      );
    } else {
      // if (this.props.navigation.getParam("searchedBooks") == undefined) {
        // console.log("Hooray");
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
                      <View style={{ flex: 1 , borderBottomWidth: 1}}>
                        <Text style={styles.title}>
                          {rowData.title}
                        </Text>
                        <Text style={styles.subtitle}>
                          {rowData.authors[0].name}
                        </Text>
                        </View>
                  );
                }}      
                 onEndReached={() => this.setState({ isLoadingMore: true }, () => this.fetchMore())}
                renderFooter={() => {
                  return (
                    this.state.isLoadingMore &&
                    <View style={{ flex: 1 }}>
                      <ActivityIndicator size="small" />
                    </View>
                  );
                }}
              />
            </View>
          </View>
        );
      // } 
      // else {
      //   console.log("oops");
      //   this.fetchSearchedBooks();
      //   console.log("oops after function");
      //   return (
      //     <View style={styles.mainContainer}>
      //       <Text
      //         style={styles.header}
      //       >{`Filtered result ${this.props.navigation.state.params.name.toUpperCase()}`}</Text>
      //       <ScrollView>
      //         {/* <List >
      //           {this.state.searched_books.map((book, i) => (
      //             <ListItem
      //               key={i}
      //               title={`${book.title}`}
      //               subtitle={`${book.authors[0].name}`}
      //             />
      //           ))}
      //         </List> */}              
      //         <ListView
      //           dataSource={this.state.dataSource} 
      //           renderRow={rowData => {
      //             return (
      //                 <View style={{ flex: 1 }}>
      //                   <Text style={styles.title}>
      //                     {rowData.title}
      //                   </Text>
      //                   <Text >
      //                     {rowData.authors[0].name}
      //                   </Text>
      //                 </View>
      //             );
      //           }}
      //         />
      //       </ScrollView>
      //     </View>
      //   );
      // }
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  // mainContainer: {
  //   flex: 1,
  //   marginBottom: 30,
  //   padding: 10
  // },
  header: {
    color: "#5c57e2",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,

  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'left',
    marginTop: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    marginBottom: 6,
  },
});

export default BookDetail;
