import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Steps from 'react-native-logistics-steps';
import logisticsData from '../mockData/pdd';

const CurrentStepIndicator = () => {
  return (
    <Image
      style={styles.currentStepIndicatorStyle}
      source={require('../images/pdd/check.png')}
    />
  );
};

const StepIndicator = () => {
  return <View style={styles.stepIndicatorStyle} />;
};

const LogisticContent = ({item}) => {
  return (
    <View>
      <Text>{item.status}</Text>
      <Text>{item.time}</Text>
    </View>
  );
};

const PddLogistics = () => {
  return (
    <View style={styles.container}>
      <Steps
        currentStepIndex={0}
        items={logisticsData.list}
        stepIndicatorMarginTop={2}
        currentStepIndicator={<CurrentStepIndicator />}
        stepIndicator={<StepIndicator />}
        renderStepContent={(item, index) => (
          <LogisticContent key={index} item={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  stepIndicatorStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#d9d9d9',
  },
  currentStepIndicatorStyle: {
    width: 16,
    height: 16,
  },
});

export default PddLogistics;
