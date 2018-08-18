import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { categories } from '../config/data';

class Feed extends Component {
  onLearnMore = (category) => {
    this.props.navigation.navigate('Details', { ...category });
  };

  render() {
    return (
      <View style={localStyles.mainContainer}>
          <Text style={localStyles.header}>
              Gutenberg {"\n"}Project
          </Text>
          <List containerStyle={{flex:1, flexDirection: 'column', justifyContent: 'space-evenly',backgroundColor: '#5c57e2' ,borderTopWidth: 0}}>
          {categories.map((category, i) => (
              <ListItem
                containerStyle={{backgroundColor: '#4e4cc6',padding:10,borderBottomWidth: 0}}
                key={i}
                title={`${category.name.toUpperCase()}`}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                chevronColor="white"
                onPress={() => this.onLearnMore(category)}
              />
            ))}
          </List>
      </View>
    );
  }
}

export default Feed;


const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#5c57e2'
  },
  header: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    padding:50
  }
});
