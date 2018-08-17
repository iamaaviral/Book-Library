import React, { Component } from 'react';
import { ScrollView , Text,View} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      // sectionBooks: [],
      loading: false
    };
}

 async componentWillMount() {
  this.setState({loading: true});
  const res = await fetch('http://skunkworks.ignitesol.com:8000/books/');
  const result = await res.json();
  this.setState({books: result.results, loading:false});
  // for(var i=0; i<this.state.books.length;i++){
  //   console.log(result.results[i].subjects);
  //     this.searchStringInArray(this.props.navigation.state.params.name, result.results[i].subjects,i)
  // }
  // console.log(this.state.sectionBooks);
}

  render() {
    // const { picture, name, email, phone, login, dob, location } = this.props.navigation.state.params;
    if(this.state.loading){
      return (
      <View>
        <Text>
          LOADING...
        </Text>
      </View>
      
      )}
    else{
      return (
        <ScrollView>
            <List style={{flex:1, flexDirection: 'column'}}>
          {this.state.books.map((book) => (
              <ListItem
                key={book.name}
                title= {`${book.title}`}
              />
            ))}
          </List>
        </ScrollView>
      );
    }
  }
}

export default BookDetail;
