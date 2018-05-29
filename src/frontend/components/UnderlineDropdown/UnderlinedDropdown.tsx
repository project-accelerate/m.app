import * as React from 'react'
import { Popover, withStyles, WithStyles } from '@material-ui/core';
import { isThisTypeNode } from 'typescript';

interface UnderlinedDropdownProps<T> {
  value: T
  onChange?: (x: T) => void
}

interface UnderlinedDropdownRenderProps<T> {
  value: T
  onChange: (x: T) => void
}

interface UnderlinedDropdownConfig<T> {
  format: (x: T) => React.ReactNode
  render: (props: UnderlinedDropdownRenderProps<T>) => React.ReactNode
}

const style = withStyles({
  link: {
    color: 'inherit',
    outline: 0
  }
})

export function createUnderlinedDropdown<T>({ render, format }: UnderlinedDropdownConfig<T>) {
  return style<UnderlinedDropdownProps<T>>(
    class UnderlinedDropdown extends React.Component<UnderlinedDropdownProps<T> & WithStyles<'link'>, { visible: boolean }> {
      state = { visible: false }
      anchor?: HTMLAnchorElement

      handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        this.anchor = event.currentTarget
        event.preventDefault()

        this.setState({ visible: true })
      }

      handleClose = () => {
        this.setState({ visible: false })
      }

      handleChange = (x: T) => {
        if (this.props.onChange) {
          this.props.onChange(x)
        }

        this.setState({ visible: false })
      }

      render() {
        return (
          <>
            <a
              href="#"
              className={this.props.classes.link}
              onClick={this.handleClick}
            >
              {format(this.props.value)}
            </a>
            <Popover
              anchorEl={this.anchor}
              open={this.state.visible}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
            {
              render({
                value: this.props.value,
                onChange: this.handleChange
              })
            }
            </Popover>
          </>
        )
      }
    }
  )
}
