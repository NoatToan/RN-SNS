import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import uuid from 'react-native-uuid';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

import { SNS } from './AbstractSNS';
import ServiceButton from './components/ServiceButton';

const rawNonce = uuid.v4();
const state = uuid.v4();

export class AppleSNS extends SNS {
  callback;
  constructor(callback: (data: any) => any) {
    super();
    this.callback = callback;
  }
  render() {
    return (
      <ServiceButton
        containerStyle={styles.appleButton}
        title={'Apple'}
        onClick={this.login}
        icon={require('./assets/images/ic_apple.png')}
      />
    );
  }
  login = () => {
    if (Platform.OS === 'android') {
      return this.loginAndroid();
    }
    return this.loginIOS;
  };

  loginAndroid = async () => {
    if (!this.callback) {
      throw new Error('Apple callback was not declared');
    }
    appleAuthAndroid.configure({
      clientId: Config.CLIENT_ID,

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: Config.CALLBACK_APPLE,

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });
    const response = await appleAuthAndroid.signIn();

    if (response?.id_token) {
      this.callback(response);

      return;
    }
    throw new Error('Error Apple Android');
  };

  loginIOS = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (appleAuthRequestResponse?.identityToken) {
      this.callback(appleAuthRequestResponse);

      return;
    }
    throw new Error('Error Apple IOS');
  };
}
const styles = StyleSheet.create({
  appleButton: {
    backgroundColor: '#000000',
    marginTop: 15,
  },
});
