import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
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
        <View style={localStyles.mainHeader}>
          <Text style={localStyles.header}>
              Gutenberg {"\n"}Project
          </Text>
        </View>
        <View style= {{flex:0.8}}>
          <List containerStyle={{backgroundColor: '#5c57e2', marginVertical:5  ,borderTopWidth: 0}}>
          {categories.map((category) => (
              <ListItem
                containerStyle={{backgroundColor: '#4e4cc6', marginVertical:5  ,borderBottomWidth: 0}}
                key={category.name}
                title={`${category.name.toUpperCase()}`}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                chevronColor="white"
                onPress={() => this.onLearnMore(category)}
              />
            ))}
          </List>
        </View>
      </View>
    );
  }
}

export default Feed;


const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    backgroundColor: '#5c57e2'
  },
  mainHeader: {
    padding: 20,
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    color: 'white',  
    fontSize: 50,
    textAlign: 'center'
  },
  listItem: {
    backgroundColor: '#4e4cc6',
    marginBottom: 15,
  }
});
