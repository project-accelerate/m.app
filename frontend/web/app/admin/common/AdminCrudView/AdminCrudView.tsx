import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { FloatingActionButton } from 'frontend.web/app/common/Widgets/Widgets'
import {
  NotificationBar,
  Notification,
} from 'frontend.web/app/common/NotificationBar/NotificationBar'

export interface AdminCrudViewProps<
  T extends AdminCrudViewItem,
  EditProps,
  AddProps
> {
  items: T[]

  renderListItem: (props: AdminCrudViewListProps<T>) => React.ReactNode
  renderEditItem?: (
    props: AdminCrudViewEditProps<T, EditProps>,
  ) => React.ReactNode
  renderAddItem: (props: AdminCrudViewAddProps<AddProps>) => React.ReactNode

  onAddItem: (item: AddProps) => Promise<void>
  onEditItem?: (item: EditProps) => Promise<void>

  saveSuccessMessage?: React.ReactNode
  addSuccessMessage?: React.ReactNode
  saveErrorMessage?: React.ReactNode
  addErrorMessage?: React.ReactNode
}

interface AdminCrudViewState<T extends AdminCrudViewItem> {
  mode: AdminCrudViewMode<T>
}

type AdminCrudViewMode<T extends AdminCrudViewItem> =
  | { type: 'list' }
  | { type: 'add' }
  | { type: 'edit'; item: T }

export interface AdminCrudViewItem {
  id: string
}

export interface AdminCrudViewListProps<T> {
  value: T
  onEdit: () => void
}

export interface AdminCrudViewEditProps<T, Edit> {
  value: T
  onSave: (value: Edit) => Promise<void>
  onCancel: () => void
}

export interface AdminCrudViewAddProps<T> {
  onSave: (value: T) => Promise<void>
  onCancel: () => void
}

/**
 * Utility for rendering an editable list of items
 */
export class AdminCrudView<
  Item extends AdminCrudViewItem,
  SavedItem = Item,
  AddedItem = SavedItem
> extends React.Component<
  AdminCrudViewProps<Item & AdminCrudViewItem, SavedItem, AddedItem>,
  AdminCrudViewState<Item>
> {
  state: AdminCrudViewState<Item> = {
    mode: { type: 'list' },
  }

  showNotification!: (notification: Notification) => void

  get canEdit() {
    return this.props.onEditItem && this.props.renderEditItem
  }

  handleCancel = () => {
    this.setState({ mode: { type: 'list' } })
  }

  handleAdd = () => {
    this.setState({ mode: { type: 'add' } })
  }

  handleEdit = (item: Item) => {
    if (!this.canEdit) {
      throw Error(`Should not allow editing uneditable items`)
    }

    this.setState({ mode: { type: 'edit', item } })
  }

  handleSaveAdd = async (item: AddedItem) => {
    try {
      await this.props.onAddItem(item)

      this.showNotification({
        type: 'success',
        content: this.props.addSuccessMessage || 'Item added',
      })

      this.setState({ mode: { type: 'list' } })
    } catch (err) {
      this.showNotification({
        type: 'error',
        content:
          this.props.addErrorMessage ||
          'An error ocurred. This item has not been added.',
      })
    }
  }

  handleSaveEdit = async (item: SavedItem) => {
    if (!this.props.onEditItem) {
      throw Error(`Should not allow editing uneditable items`)
    }

    try {
      await this.props.onEditItem(item)

      this.showNotification({
        type: 'success',
        content: this.props.saveSuccessMessage || 'Item saved',
      })

      this.setState({ mode: { type: 'list' } })
    } catch (err) {
      this.showNotification({
        type: 'error',
        content:
          this.props.saveErrorMessage ||
          'An error ocurred. Your changes have not been saved.',
      })
    }
  }

  render() {
    const { mode } = this.state
    const { items, renderAddItem, renderEditItem, renderListItem } = this.props

    return (
      <NotificationBar>
        {({ showNotification }) => {
          this.showNotification = showNotification

          return (
            <>
              <Grid direction="row" wrap="wrap" spacing={16} container>
                {mode.type === 'add' && (
                  <Grid item>
                  Hello
                    {renderAddItem({
                      onCancel: this.handleCancel,
                      onSave: this.handleSaveAdd,
                    })}
                  </Grid>
                )}
                {mode.type === 'edit' &&
                  renderEditItem && (
                    <Grid item>
                      {renderEditItem({
                        onCancel: this.handleCancel,
                        onSave: this.handleSaveEdit,
                        value: mode.item,
                      })}
                    </Grid>
                  )}
                {items.map(item => (
                  <Grid key={item.id} item xs={12} md={6}>
                    {renderListItem({
                      value: item,

                      onEdit: () => this.handleEdit(item),
                    })}
                  </Grid>
                ))}
              </Grid>
              {mode.type === 'list' && (
                <FloatingActionButton
                  color="secondary"
                  onClick={this.handleAdd}
                >
                  <Add />
                </FloatingActionButton>
              )}
            </>
          )
        }}
      </NotificationBar>
    )
  }
}
