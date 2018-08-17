import React from 'react';
import { TabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import Settings from '../screens/Settings';
import BookDetail from '../screens/BookDetail';
import Me from '../screens/Me';

export const Root = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      // title: 'Feed',
      header: null
    },
  },
  Details: {
    screen: BookDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
});

// export const Tabs = TabNavigator({
//   Feed: {
//     screen: FeedStack,
//     navigationOptions: {
//       tabBarLabel: 'Feed',
//       tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
//     },
//   },
//   Me: {
//     screen: Me,
//     navigationOptions: {
//       tabBarLabel: 'Me',
//       tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
//     },
//   },
// });

// export const SettingsStack = createStackNavigator({
//   Settings: {
//     screen: Settings,
//     navigationOptions: {
//       title: 'Settings',
//     },
//   },
// });

// export const Root = createStackNavigator({
//   Tabs: {
//     screen: FeedStack,
//   },
//   Settings: {
//     screen: SettingsStack,
//   },
// }, {
//   mode: 'modal',
//   headerMode: 'none',
// });
