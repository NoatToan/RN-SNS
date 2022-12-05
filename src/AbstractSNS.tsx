import React from 'react';
import { View } from 'react-native';

export abstract class SNS {
  constructor() {}

  abstract login(): any;
  render(content: any | null) {
    return <View>{content}</View>;
  }
}
