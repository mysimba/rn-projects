import * as React from 'react';
import {
  LayoutAnimation,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {collapseData} from '../utils/data.ts';
import {useState} from 'react';

const LayoutAnimationCollapse = () => {
  const [expanded, setExpanded] = useState(0);
  const onPress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(value => (value === index ? 0 : index));
  };

  return (
    <SafeAreaView>
      {collapseData.map((value, index) => {
        return (
          <View key={index}>
            {/* 질문 */}
            <TouchableWithoutFeedback onPress={() => onPress(index + 1)}>
              <View
                style={{
                  backgroundColor: '#d646f0',
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>
                  {index + 1}. {value.q}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {/*  답변  */}
            {expanded === index + 1 && (
              <View
                style={{
                  backgroundColor: '#f4f4f4',
                  paddingVertical: 20,
                  paddingHorizontal: 40,
                  justifyContent: 'center',
                  borderBottomColor: '#ddd',
                  borderBottomWidth: 1,
                }}>
                <Text>{value.a}</Text>
              </View>
            )}
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default LayoutAnimationCollapse;
