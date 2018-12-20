import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import MenuItem from '../components/MenuItem';

import Featured from '../components/Featured';

export default class Hub extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <ScrollView
              scrollEventThrottle={16}
            >
              <View style={{flex: 1}}>
                <Text style={{fontSize: 24, fontWeight: '700',
                  paddingHorizontal: 20, textAlign: 'center'}}>
                  INSJ HUB
                </Text>
                <Text style={{fontWeight: '100', marginTop: 15,                 paddingHorizontal: 20, textAlign: 'center'}}>
                  Getchoself a friend
                </Text>
              </View>
            </ScrollView>
          </View>
          <Button onPress={() => this.props.navigation.navigate('Fag')} title="Kollokvie"/>

        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
            <View style={styles.menuContainer}>
                <MenuItem
                  imageUri={require('../assets/images/beer.png')}
                  name="Møt Andre"
                />
                <MenuItem
                  imageUri={require('../assets/images/open-book.png')}
                  name="Fag"
                />
                <MenuItem
                  imageUri={require('../assets/images/group.png')}
                  name="Gruppe"
                />
            </View>
        </View>

          <View style={{marginTop: 0}}>
                <ScrollView
                    scrollEventThrottle={16}
                    >
                    <View style={{flex: 1, paddingTop: 0}}>
                        <Text style={{ right: -10, fontSize: 24, fontWeight: '700',
                            paddingHorizontal: 20}}>
                                Forslag
                        </Text>
                        <Text style={{ right: -10, fontWeight: '100', marginTop: 10,                 paddingHorizontal: 20}}>
                                Aktiviteter, Events, etc etc etc
                        </Text>

                        <View style={{ right: -10, height: 130, marginTop: 20 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <Featured imageUri={require('../assets/images/bowling.jpg')}
                                        name="Bowling"
                                    />

                                    <Featured imageUri={require('../assets/images/cinema.jpg')}
                                        name="Kino"
                                    />

                                    <Featured imageUri={require('../assets/images/concert.jpg')}
                                        name="Konsert"
                                    />

                                    <Featured imageUri={require('../assets/images/study.jpg')}
                                        name="Studiegruppe"
                                    />
                                </ScrollView>
                            </View>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(47,163,218, .4)'
  },
  menuContainer: {
    height: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
