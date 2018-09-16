import * as React from 'react'
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  Dimensions,
  ViewStyle,
  StyleProp,
  Animated,
  ScrollView,
} from 'react-native'
import { ErrorGuard } from '../ErrorView/ErrorGuard'
import { NotificationListener } from '../Notification/NotificationListener'
import { HeaderBar, HEADER_HEIGHT } from './HeaderBar'
import { theme } from '../../../theme'
import { ParallaxScrollView } from '../Widgets/ParallaxScrollView'
import { BasicScreen } from './BasicScreen'
import { CachedImage } from '../Widgets/CachedImage'
import { ProfileImage } from '../Widgets/Widgets'

interface ImageHeaderScreenProps extends React.Props<{}> {
  noBackButton?: boolean
  image?: ImageSourcePropType | string
  title?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  tintHeader?: boolean
  parralax?: boolean
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
  tintParallax: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: HEADER_HEIGHT,
    backgroundColor: theme.pallete.imageOverlay,
  },
  image: {
    height: Dimensions.get('screen').height * 0.5,
    resizeMode: 'cover',
  },
  floatHeader: {
    backgroundColor: theme.pallete.imageOverlay,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    width: '100%',
  },
  parralaxHeader: {
    backgroundColor: theme.pallete.transparent,
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
  parralax,
}: ImageHeaderScreenProps) {
  if (!image) {
    return <BasicScreen noBackButton={noBackButton}>{children}</BasicScreen>
  }

  if (!parralax) {
    return (
      <ErrorGuard>
        <View>
          <HeaderBar
            style={styles.floatHeader}
            floating
            noBackButton={noBackButton}
          />
          <ScrollView>
            <CachedImage
              style={styles.image}
              source={typeof image === 'string' ? { uri: image } : image}
            />
            {children}
          </ScrollView>
        </View>
      </ErrorGuard>
    )
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
            <HeaderBar
              floating
              noBackButton={noBackButton}
              style={styles.parralaxHeader}
            />
          )}
          renderTint={
            tintHeader &&
            ((opacity: any) => (
              <Animated.View style={[{ opacity }, styles.tintParallax]} />
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
