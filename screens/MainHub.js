/*import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { horizontalFlatListData } from '../data/HorizontalFlatListData';

class HorizontalFlatListItem extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 130,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 4,
      }}>
        <Text style={{ fontSize: 16}}>
          {this.props.item.test}
        </Text>
      </View>
    )
  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Text style={{fontSize: 30, marginVertical: 45}}>INSJ</Text>
          </View>

          <View style={styles.gridContainer}>
              <View style={{flex: 1}}>
                <Image
                  source={
                    __DEV__
                    ? require('../assets/images/calendar.png')
                    : require('../assets/images/calendar.png')
                  }
                  style={styles.gridImage}
                  />
                  <Text style={styles.gridText}>Arrangementer</Text>
              </View>
              <View style={{flex: 1}}>
              <Image
                source={
                  __DEV__
                  ? require('../assets/images/books-stack-of-three.png')
                  : require('../assets/images/books-stack-of-three.png')
                }
                style={styles.gridImage}
                />
                <Text style={styles.gridText}>Kollokvie</Text>
              </View>
              <View style={{flex: 1}}>
              <Image
                source={
                  __DEV__
                  ? require('../assets/images/snooker.png')
                  : require('../assets/images/snooker.png')
                }
                style={styles.gridImage}
                />
                <Text style={styles.gridText}>Møt andre</Text>
              </View>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={{fontSize: 20, marginTop: 80}}>Forslag for deg:</Text>
          </View>

          <View style={styles.horizontalScrollContainer}>
            <View style={{height: 150}}>
              <FlatList
                style={{opacity: 0.7,}}
                horizontal={true}
                data={horizontalFlatListData}
                renderItem={({item, index}) => {
                  return (
                    <HorizontalFlatListItem item={item} index={index} parentFlatList={this}>
                    </HorizontalFlatListItem>
                  )
                }}>
              </FlatList>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    height: 120,
    marginTop: 10,
    marginBottom: 10,
  },
  gridContainer: {
    height: 120,
    flexDirection: 'row',
  },
  gridImage: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 30
  },
  gridText: {
    textAlign: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  horizontalScrollContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
*/
