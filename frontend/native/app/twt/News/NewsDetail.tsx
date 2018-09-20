import * as React from 'react'
import { NewsDetailFragment } from '../../../queries'
import { Typography, Markdown } from '../../common/Typography/Typography'
import { Rows } from '../../common/Widgets/Widgets'
import { StyleSheet, ScrollView } from 'react-native'
import { theme } from '../../../theme'

const styles = StyleSheet.create({
  title: {
    margin: theme.spacing.level(1),
    marginTop: theme.spacing.level(3),
    marginBottom: theme.spacing.level(2),
  },
  body: {
    margin: theme.spacing.level(1),
    marginBottom: theme.spacing.level(3),
  },
})

export function NewsDetail(props: { item: NewsDetailFragment }) {
  return (
    <ScrollView>
      <Typography variant="display" accent style={styles.title}>
        {props.item.title}
      </Typography>

      <Markdown value={props.item.message} style={styles.body} />
    </ScrollView>
  )
}
