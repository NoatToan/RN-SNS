import React from 'react';
import { NativeModules, StyleSheet } from 'react-native';
import Config from 'react-native-config';

import { SNS } from './AbstractSNS';
import ServiceButton from './components/ServiceButton';
const { RNTwitterSignIn } = NativeModules;

export class TwitterSNS extends SNS {
  callback;
  constructor(callback: (data: any) => any) {
    super();
    this.callback = callback;
  }
  render = () => {
    return super.render(
      <ServiceButton
        containerStyle={styles.twitterButton}
        title={'Twitter'}
        onClick={this.login}
        icon={require('./assets/images/ic_twitter.png')}
      />
    );
  };

  login = () => {
    if (!this.callback) {
      throw new Error('Twitter callback was not declared');
    }
    RNTwitterSignIn.init(Config.TWITTER_API_KEY, Config.TWITTER_API_SECRET_KEY);
    RNTwitterSignIn.logIn()
      .then((res: any) => {
        if (res) {
          this.callback(res);
        }
      })
      .catch(() => {
        throw new Error('Error Twitter');
      });
  };
}
const styles = StyleSheet.create({
  twitterButton: {
    backgroundColor: '#4DA9E8',
    marginTop: 15,
  },
});
