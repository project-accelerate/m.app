import * as React from 'react'
import { Route } from 'react-static'
import { Tab } from '@material-ui/core'
import { Tabs } from '@material-ui/core'
import { TabsProps } from '@material-ui/core/Tabs'
import { TabProps } from '@material-ui/core/Tab'

interface PageTabsProps extends TabsProps {}

interface PageTabProps extends TabProps {
  path: string
}

export const PageTabs = (props: PageTabsProps) => (
  <Route>
    {({ location, history }) => {
      const pages = React.Children.toArray(props.children) as Array<
        React.ReactElement<PageTabProps>
      >
      const value = pages.findIndex(
        page => page.props.path === location.pathname,
      )

      return (
        <Tabs {...props} value={value}>
          {pages.map(page =>
            React.cloneElement(page, {
              onClick: () => history.push(page.props.path),
            }),
          )}
        </Tabs>
      )
    }}
  </Route>
)

export const PageTab = (Tab as any) as React.ComponentType<PageTabProps>
