import React, { Component } from 'react';
import { View , Text, style} from 'react-native';
import { SearchBar, List, ListItem, Button } from 'react-native-elements';

class Search extends Component {
  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  render() {
    return (
      <View style={{width: 300}}>
          <SearchBar
            containerStyle={{backgroundColor: 'transparent', borderTopColor: 'transparent',borderBottomColor: '#9877f4',marginBottom: 10} }
            inputStyle={{backgroundColor: '#5c57e2', margin: 0, color: 'white',paddingLeft: 10}}
            placeholderTextColor={'#9877f4'}
            noIcon
            placeholder={'Search'}
        />
      </View>
    );
  }
}

export default Search;
