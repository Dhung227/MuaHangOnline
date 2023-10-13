import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


handleLogin = () => {
  // Xử lý đăng nhập ở đây
};

const Test1 = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toISOString());
    hideDatePicker();
  };

  return (
    <SafeAreaView>
    <Text>TEST DATE PICKER</Text>
      <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={showDatePicker}>
          <Text>Show Date Picker</Text>
        </TouchableOpacity>
        <Text>Selected Date: {selectedDate}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formContainer: {
    width: 200,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default Test1;
