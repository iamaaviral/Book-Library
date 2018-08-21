import React, { Component } from "react";
import { View, Text, style } from "react-native";
import { SearchBar, List, ListItem, Button } from "react-native-elements";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  handleSubmit() {
    let sParameter = this.state.text;
    sParameter = encodeURIComponent(sParameter.trim());
    this.props.navigate.setParams({ searchedBooks: "jgjhgjh" });
    const screenProps = { searchedBooks:sParameter }
  }

  render() {
    return (
      <View style={{ width: 300 }}>
        <SearchBar
          containerStyle={{
            backgroundColor: "transparent",
            borderTopColor: "transparent",
            borderBottomColor: "#9877f4"
          }}
          inputStyle={{ backgroundColor: "#5c57e2", margin: 0, color: "white" }}
          placeholderTextColor={"#9877f4"}
          noIcon       
          placeholder={"Search"}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onSubmitEditing={this.handleSubmit.bind(this)}
        />
      </View>
    );
  }
}

export default Search;
