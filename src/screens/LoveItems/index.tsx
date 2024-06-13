import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Styles from './style';
import { useTheme } from '../../hooks/themeContext';
import { COLORS } from '../../themes/variables/colors';

const LoveItems = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {theme} = useTheme();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
    ,[]
  )

  return (
      <View style={[Styles.container, {backgroundColor:theme.backgroundColor}]}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="gray"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['50%', '100%']}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor:theme.backgroundTab }}
          handleIndicatorStyle={{ backgroundColor:COLORS.white }}
        >
          <BottomSheetView style={[Styles.contentContainer]}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
  );
};

const styles = StyleSheet.create({
  
});

export default LoveItems;