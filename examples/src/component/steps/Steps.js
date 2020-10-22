import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const styles = {
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    width: 1,
    backgroundColor: '#eae9e9',
    display: 'flex',
    alignItems: 'center',
  },
  stepProgressBarWrapper: {
    width: 20,
    alignItems: 'center',
  },
  stepContentWrapper: {
    flex: 1,
  },
};

const Steps = ({
  steps = [],
  renderStepContent,
  currentStepIndex,
  currentStepIndicator,
  stepIndicator,
  stepIndicatorMarginTop = 0,
}) => {
  console.log("steps____________",steps)
  return (
    <View style={styles.wrapper}>
      {steps.map((step, index) => {
        const isLastOne = index + 1 === steps.length;
        return (
          <Step
            key={'step_' + index}
            renderStepContent={renderStepContent}
            step={step}
            index={index}
            currentStepIndex={currentStepIndex}
            stepIndicator={stepIndicator}
            currentStepIndicator={currentStepIndicator}
            isLastOne={isLastOne}
            isFirstOne={index === 0}
            stepIndicatorMarginTop={stepIndicatorMarginTop}
          />
        );
      })}
    </View>
  );
};

const StepIndicator = ({
  children,
  marginTop,
  indicatorHeight,
  setIndicatorHeight,
}) => {
  return (
    <View
      style={{marginTop}}
      onLayout={(event) => {
        if (indicatorHeight === 0) {
          setIndicatorHeight(event.nativeEvent.layout.height);
        }
      }}>
      {children}
    </View>
  );
};

const Step = ({
  step,
  index,
  renderStepContent,
  currentStepIndex,
  currentStepIndicator,
  stepIndicator,
  isLastOne,
  isFirstOne,
  stepIndicatorMarginTop,
}) => {
  const [progressBarHeight, setProgressBarHeight] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);
  let pBarHeight = progressBarHeight;
  if (isLastOne) {
    pBarHeight = indicatorHeight / 2 + stepIndicatorMarginTop;
  }
  let pBarMarginTop = 0;
  if (isFirstOne) {
    pBarMarginTop = stepIndicatorMarginTop;
    pBarHeight = progressBarHeight - pBarMarginTop;
  }
  if (isFirstOne && isLastOne) {
    pBarHeight = 0;
  }
  console.log('pBarHeight________________________', pBarHeight);
  console.log('indicatorHeight________________________', indicatorHeight);
  return (
    <View style={styles.stepWrapper}>
      <View
        style={styles.stepProgressBarWrapper}
        onLayout={(event) => {
          if (progressBarHeight === 0) {
            setProgressBarHeight(event.nativeEvent.layout.height);
          }
        }}>
        <View
          style={[
            styles.progressBar,
            {height: pBarHeight, marginTop: pBarMarginTop},
          ]}>
          <StepIndicator
            marginTop={isFirstOne ? 0 : stepIndicatorMarginTop}
            indicatorHeight={indicatorHeight}
            setIndicatorHeight={setIndicatorHeight}>
            {index === currentStepIndex ? currentStepIndicator : stepIndicator}
          </StepIndicator>
        </View>
      </View>
      <View style={styles.stepContentWrapper}>
        {renderStepContent(step, index)}
      </View>
    </View>
  );
};

Steps.propTypes = {
  steps: PropTypes.array,
  renderStepContent: PropTypes.func,
  currentStepIndex: PropTypes.number,
  currentStepIndicator: PropTypes.element,
  stepIndicator: PropTypes.element,
  stepIndicatorMarginTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

Steps.defaultProps = {
  steps: [],
  stepIndicatorMarginTop: 0,
};

export default Steps;
