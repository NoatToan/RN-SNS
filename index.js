import React from 'react';
import { View } from 'react-native';

import { AppleSNS } from '@toannguyen1510/rn-social-login/src/AppleSNS';
import { LineSNS } from '@toannguyen1510/rn-social-login/src/LineSNS';
import { TwitterSNS } from '@toannguyen1510/rn-social-login/src/TwitterSNS';
import PropTypes from 'prop-types';

export default class SocialLogin extends React.Component {
  line = new LineSNS(this.props.onLineLogin);
  twitter = new TwitterSNS(this.props.onTwitterLogin);
  apple = new AppleSNS(this.props.onAppleLogin);
  render() {
    return (
      <View>
        {this.line.render()}
        {this.twitter.render()}
        {this.apple.render()}
      </View>
    );
  }
}

SocialLogin.propTypes = {
  onLineLogin: PropTypes.func,
  onTwitterLogin: PropTypes.func,
  onAppleLogin: PropTypes.func,
};

SocialLogin.defaultProps = {
  onLineLogin: (data) => {
    console.log('onLineLogin', { data });
  },
  onTwitterLogin: (data) => {
    console.log('onTwitterLogin', { data });
  },
  onAppleLogin: (data) => {
    console.log('onAppleLogin', { data });
  },
};
