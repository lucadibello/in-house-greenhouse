import * as React from "react"
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native"
import { observer } from "mobx-react-lite"


interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface ImageOverlayProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<OverlayImageStyle>
  children?: React.ReactNode;
  source: ImageBackgroundProps;
}

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

/**
 * Describe your component here
 */
export const ImageOverlay = observer(function ImageOverlay(props: ImageOverlayProps) {

  const { style, children, ...imageBackgroundProps } = props;
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <ImageBackground
      {...imageBackgroundProps}
      style={imageBackgroundStyle}>
      <View style={[
        StyleSheet.absoluteFill,
        { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR },
      ]}/>
      {children}
    </ImageBackground>
  );
})
