/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import Tabs from 'react-native-tabs';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import PddLogistics from './component/PddLogistics';
import TaobaoLogistics from './component/TaobaoLogistics';
import JdLogistics from './component/JdLogistics';

const tabPage = {
  pdd: <PddLogistics />,
  taobao: <TaobaoLogistics />,
  jd: <JdLogistics />,
};

const App = () => {
  const [page, setPage] = useState('pdd');
  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        {tabPage[page]}
      </ScrollView>
      <Tabs
        selected={page}
        style={styles.tabsStyle}
        selectedStyle={{color: 'red'}}
        onSelect={(el) => setPage(el.props.name)}>
        <Text name="pdd" style={styles.textStyle}>
          拼多多
        </Text>
        <Text name="taobao" style={styles.textStyle}>
          淘宝
        </Text>
        <Text name="jd" style={styles.textStyle}>
          京东
        </Text>
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  textStyle: {
    color: 'gray',
  },
  tabsStyle: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
});

export default App;
