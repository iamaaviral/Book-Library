import React, { Component } from 'react';
import { ScrollView , Text,View, ActivityIndicator, StyleSheet} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      category_books: [],
      // sectionBooks: [],
      loading: false
    };
}

 async componentWillMount() {
  this.setState({loading: true});
  const res = await fetch('http://skunkworks.ignitesol.com:8000/books/');
  const result = await res.json();
  this.setState({books: result.results});
  for(var i=0; i<this.state.books.length;i++){
    for(var j=0; j< result.results[i].subjects.length; j++){
      if(result.results[i].subjects[j].search("" +this.props.navigation.state.params.name+ "")> -1){

        this.setState({
          category_books: [...this.state.category_books, result.results[i]],
          })
          break;
      }else{
        continue ;
      }
    }
  this.setState({loading: false});
}
}

  render() {
    // const { picture, name, email, phone, login, dob, location } = this.props.navigation.state.params;
    if(this.state.loading){
      return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#5c57e2" />
        </View>
      )}
    else{
      return (
        <ScrollView>
            <List style={{flex:1, flexDirection: 'column'}}>
          {this.state.category_books.map((book, i) => (
              <ListItem
                key={i}
                title= {`${book.title}`}
              />
            ))}
          </List>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default BookDetail;
