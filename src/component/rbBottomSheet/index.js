/**
 * RBBottom Sheet
 */
import React, {forwardRef} from 'react';
import style from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';

const RBBottomSheet = forwardRef((props, ref) => {
  const {
    closeOnDragDown = true,
    closeOnPressMask = true,
    openDuration = 100,
    closeDuration = 100,
    height = 600,
    dragFromTopOnly = true,
    child,
    containerStyle = {},
    draggableIconStyle = {},
    onClose,
    wrapperStyle = {},
    showTransparent = false,
    onOpen,
    withCloseButton,
    autoHeight,
    customHeight,
  } = props || {};

  const handleRBSheetHeight = () => {
    if (autoHeight) {
      return undefined;
    } else if (customHeight) {
      return customHeight;
    } else {
      return '35%';
    }
  };

  /**
   *  Return
   */
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={withCloseButton ? false : closeOnDragDown}
      closeOnPressMask={closeOnPressMask}
      dragFromTopOnly={dragFromTopOnly}
      height={height}
      onClose={onClose}
      onOpen={onOpen}
      openDuration={openDuration}
      keyboardAvoidingViewEnabled={false}
      closeDuration={closeDuration}
      customStyles={{
        wrapper: {
          ...style.backgroundcolorStyle(showTransparent),
          ...wrapperStyle,
        },
        draggableIcon: {...style.draggableIcon, ...draggableIconStyle},
        container: {
          ...style.container,
          height: handleRBSheetHeight(),
          ...containerStyle,
        },
      }}>
      {child}
    </RBSheet>
  );
});

export default RBBottomSheet;
