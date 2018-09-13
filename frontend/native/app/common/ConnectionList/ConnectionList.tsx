import React from 'react'
import {
  SectionList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  SectionListData,
} from 'react-native'
import { groupBy, sortBy } from 'lodash'
import { LoadingOverlay, Grid, Columns, Rows } from '../Widgets/Widgets'
import { theme } from '../../../theme'
import { Typography } from '../Typography/Typography'
import { Card, CardHeader, CardContent } from '../Widgets/Card'
import { Background } from '../Layouts/Layouts'

const ConnectionListStyle = StyleSheet.create({
  sectionSeparator: {},
  itemSeparator: {
    width: '100%',
    backgroundColor: theme.pallete.transparent,
    height: theme.spacing.border,
  },
  sectionFooter: {
    marginBottom: theme.spacing.level(2),
  },
  header: {
    padding: theme.spacing.level(1),
    backgroundColor: theme.pallete.contrast,
  },
  headerText: {
    color: theme.pallete.white,
  },
})

interface ConnectionListProps<T> {
  data?: Connection<T>
  sortKey?: keyof T
  emptyMessage?: JSX.Element
  sectionBy?: (x: T) => string
  renderItem: (value: T) => JSX.Element
  renderSection: (value: string) => React.ReactNode
}

export interface Connection<T> {
  edges: {
    node: T
  }[]
}

export class ConnectionList<T> extends React.Component<ConnectionListProps<T>> {
  renderItem = ({ item }: ListRenderItemInfo<{ node: T }>) => {
    return this.props.renderItem(item.node)
  }

  renderSectionHeader = (props: { section: SectionListData<{}> }) => (
    <View style={ConnectionListStyle.header}>
      <Typography variant="cardTitle" style={ConnectionListStyle.headerText}>
        {this.props.renderSection(props.section.key || '')}
      </Typography>
    </View>
  )

  get dataSections(): SectionListData<{ node: T }>[] {
    const { data, sectionBy, sortKey } = this.props

    if (!data) {
      return [{ key: '', data: [] }]
    }

    if (!sectionBy) {
      return [{ key: '', data: data.edges }]
    }

    const sectionMap = groupBy(data.edges, edge => sectionBy(edge.node))

    const orderedSectionKeys = sortBy(Object.keys(sectionMap))

    return orderedSectionKeys.map(key => ({
      key,
      data: this.sortedEdges(sectionMap[key]),
    }))
  }

  sortedEdges(edges: { node: T }[]) {
    const { sortKey } = this.props

    if (!sortKey) {
      return edges
    }

    return sortBy(edges, item => item.node[sortKey])
  }

  render() {
    const { data } = this.props

    if (!data) {
      return <LoadingOverlay />
    }

    if (data.edges.length === 0) {
      return this.props.emptyMessage || null
    }

    return (
      <SectionList
        sections={this.dataSections}
        renderItem={this.renderItem}
        keyExtractor={item => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
        renderSectionHeader={this.renderSectionHeader}
        renderSectionFooter={SectionSeparator}
      />
    )
  }
}

function ItemSeparator() {
  return <View style={ConnectionListStyle.itemSeparator} />
}

function SectionSeparator() {
  return <View style={ConnectionListStyle.sectionSeparator} />
}
