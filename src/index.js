import React, { useState } from "react";
import styled from "styled-components/native";

const StepsBox = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

const Steps = ({
  steps = [],
  renderStepContent,
  currentStepIndex,
  currentStepIndicator,
  stepIndicator,
  stepIndicatorMarginTop = 0,
}) => {
  return (
    <StepsBox>
      {steps.map((step, index) => {
        const isLastOne = index + 1 === steps.length;
        return (
          <Step
            key={"step_" + index}
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
    </StepsBox>
  );
};

const StepBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressBar = styled.View`
  width: 1px;
  background-color: #eae9e9;
  height: ${(props) => props.height}px;
  margin-top: ${(props) => props.marginTop}px;
  display: flex;
  align-items: center;
`;

const StepIndicatorBox = styled.View`
  margin-top: ${(props) => props.marginTop}px;
`;

const StepIndicator = ({
  children,
  marginTop,
  indicatorHeight,
  setIndicatorHeight,
}) => {
  return (
    <StepIndicatorBox
      marginTop={marginTop}
      onLayout={(event) => {
        if (indicatorHeight === 0) {
          setIndicatorHeight(event.nativeEvent.layout.height);
        }
      }}
    >
      {children}
    </StepIndicatorBox>
  );
};

const StepProgressBarBox = styled.View`
  width: 20px;
  align-items: center;
`;

const StepContentBox = styled.View`
  flex: 1;
`;

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
  console.log("pBarHeight________________________", pBarHeight);
  console.log("indicatorHeight________________________", indicatorHeight);
  return (
    <StepBox>
      <StepProgressBarBox
        onLayout={(event) => {
          if (progressBarHeight === 0) {
            setProgressBarHeight(event.nativeEvent.layout.height);
          }
        }}
      >
        <ProgressBar height={pBarHeight} marginTop={pBarMarginTop}>
          <StepIndicator
            marginTop={isFirstOne ? 0 : stepIndicatorMarginTop}
            indicatorHeight={indicatorHeight}
            setIndicatorHeight={setIndicatorHeight}
          >
            {index === currentStepIndex ? currentStepIndicator : stepIndicator}
          </StepIndicator>
        </ProgressBar>
      </StepProgressBarBox>
      <StepContentBox>{renderStepContent(step, index)}</StepContentBox>
    </StepBox>
  );
};

export default Steps;
