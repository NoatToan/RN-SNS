/* eslint-disable react/react-in-jsx-scope */
import LineLogin, { LoginPermission } from '@xmartlabs/react-native-line';
import React from 'react';
import { SNS } from './AbstractSNS';
import ServiceButton from './components/ServiceButton';

export class LineSNS extends SNS {
  callback;
  constructor(callback: (data: any) => any) {
    super();
    this.callback = callback;
  }
  render = () => {
    return super.render(
      <ServiceButton
        containerStyle={{
          backgroundColor: '#5ac463',
          marginTop: 60,
        }}
        title={'Line'}
        onClick={this.login}
      />
    );
  };

  login = async () => {
    const loginResult = await LineLogin.login({
      scopes: [LoginPermission.PROFILE, LoginPermission.OPEN_ID],
    });
    if (!this.callback) {
      throw new Error('Line callback was not declared');
    }
    if (loginResult?.accessToken?.id_token) {
      this.callback(loginResult);

      return;
    }
    throw new Error('Line fail');
  };
}
