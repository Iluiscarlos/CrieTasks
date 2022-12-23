import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';


const ViewPicker = () => {

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const lista = [
    {
      value: 1,
      label: 'Javascript'
    },
    {
      value: 2,
      label: 'Java'
    },
    {
      value: 3,
      label: 'C#'
    }
  ]
  return (
    <View style={{ flex: 1}}>
      <SafeAreaView>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(value, index) => setSelectedLanguage(value)}>
              {
                lista.map((item) => {
                  return <Picker.Item
                            key={item.value}
                            value={item.value}
                            label={item.label}/>
                })
              }
            </Picker>
      </SafeAreaView>
    </View>
  )
}

export default ViewPicker;