import * as React from 'react'
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  Dimensions,
  ViewStyle,
  StyleProp,
  Animated,
} from 'react-native'
import { ErrorGuard } from '../ErrorView/ErrorGuard'
import { NotificationListener } from '../Notification/NotificationListener'
import { HeaderBar, HEADER_HEIGHT } from './HeaderBar'
import { theme } from '../../../theme'
import { ParallaxScrollView } from '../Widgets/ParallaxScrollView'
import { BasicScreen } from './BasicScreen'

interface ImageHeaderScreenProps extends React.Props<{}> {
  noBackButton?: boolean
  image?: ImageSourcePropType | string
  title?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  tintHeader?: boolean
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.pallete.white,
  },
  screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  tint: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: HEADER_HEIGHT,
    backgroundColor: theme.pallete.imageOverlay,
  },
  content: {
    flexGrow: 1,
    position: 'relative',
  },
})

export function ImageHeaderScreen({
  children,
  noBackButton,
  image,
  title,
  containerStyle,
  tintHeader,
}: ImageHeaderScreenProps) {
  if (!image) {
    return <BasicScreen noBackButton={noBackButton}>{children}</BasicScreen>
  }

  return (
    <ErrorGuard>
      <View style={styles.screen}>
        <NotificationListener />
        <ParallaxScrollView
          containerStyle={[styles.container, containerStyle]}
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={Dimensions.get('screen').height * 0.5}
          extraScrollHeight={20}
          navbarColor={theme.pallete.accent}
          title={title}
          backgroundImage={extractImageSource(image)}
          backgroundImageScale={1.2}
          renderNavBar={() => (
            <HeaderBar floating noBackButton={noBackButton} />
          )}
          renderTint={
            tintHeader &&
            ((opacity: any) => (
              <Animated.View style={[{ opacity }, styles.tint]} />
            ))
          }
          renderContent={() => children}
        />
      </View>
    </ErrorGuard>
  )
}

function extractImageSource(img: string | ImageSourcePropType) {
  if (typeof img === 'string') {
    return {
      cache: 'force-cache',
      uri: img,
    }
  }

  return img
}
