import * as React from 'react'
import { NewsPanelFragment } from '../../../queries'
import { CardHeader, CardContent, Card } from '../../common/Widgets/Card'

interface NewsPanelProps {
  news: NewsPanelFragment
  onPress: (id: string) => void
}

export function NewsPanel(props: NewsPanelProps) {
  return (
    <Card onPress={() => props.onPress(props.news.id)}>
      <CardHeader>{props.news.title}</CardHeader>
      <CardContent>{truncate(props.news.detail)}</CardContent>
    </Card>
  )
}

function truncate(str?: string | null) {
  if (!str) return ''
  return str.substr(0, 600) + (str.length > 400 ? '…' : '')
}
