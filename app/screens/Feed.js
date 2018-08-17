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
              Node demo
          </Text>
        </View>
      <ScrollView style={{flex:0.6}}>
        {/* <List>
          {users.map((user) => (
            <ListItem
              key={user.login.username}
              roundAvatar
              avatar={{ uri: user.picture.thumbnail }}
              title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
              subtitle={user.email}
              onPress={() => this.onLearnMore(user)}
            />
          ))}
        </List> */}
        <List style={{flex:1, flexDirection: 'column'}}>
        {categories.map((category) => (
            <ListItem
              style={localStyles.listItem}
              key={category.name}
              title={`${category.name.toUpperCase()}`}
              onPress={() => this.onLearnMore(category)}
            />
          ))}
        </List>
      </ScrollView>
      
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
    padding: 10
  },
  mainHeader: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40
  },
  listItem: {
    
    marginBottom: 15,
  }
});
