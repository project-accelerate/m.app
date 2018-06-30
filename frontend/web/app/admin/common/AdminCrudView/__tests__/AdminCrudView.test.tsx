import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import {
  AdminCrudView,
  AdminCrudViewProps,
  AdminCrudViewListProps,
  AdminCrudViewEditProps,
  AdminCrudViewAddProps,
} from '../AdminCrudView'
import { NotificationBar } from 'frontend.web/app/common/NotificationBar/NotificationBar'
import { FloatingActionButton } from 'frontend.web/app/common/Widgets/Widgets'
import { someSyntheticEvent } from 'common/test/testUtils'

describe(AdminCrudView, () => {
  it('should start rendering content items', () => {
    const fixture = new Fixture()

    expect(fixture.tree).toContainReact(LIST_ITEM_VIEW)
  })

  describe('when add button is pressed', () => {
    it('should show add item view', () => {
      const fixture = new Fixture()

      fixture.pressAddItemButton()

      expect(fixture.tree).toContainReact(ADD_VIEW)
    })

    describe('on submit', () => {
      it('should submit', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.pressAddItemButton()
        await fixture.submitNewItem(newItem)

        expect(fixture.onAddItem).toHaveBeenCalledWith(newItem)
      })

      it('should hide the add item view on success', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.givenThatNewItemSubmissionSucceeds()

        fixture.pressAddItemButton()
        await fixture.submitNewItem(newItem)

        expect(fixture.tree).not.toContainReact(ADD_VIEW)
      })

      it('should keep add item view visible on failure', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.givenThatNewItemSubmissionFails()

        fixture.pressAddItemButton()
        await fixture.submitNewItem(newItem)

        expect(fixture.tree).toContainReact(ADD_VIEW)
      })
    })

    describe('on cancel', () => {
      it('should not submit', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.pressAddItemButton()
        fixture.cancelSubmitNewItem()

        expect(fixture.onAddItem).not.toHaveBeenCalled()
      })

      it('should keep add item view visible', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.pressAddItemButton()
        fixture.cancelSubmitNewItem()

        expect(fixture.tree).toContainReact(ADD_VIEW)
      })
    })
  })

  describe('when edit item button is pressed', () => {
    it('should replace list item view with edit view', () => {
      const fixture = new Fixture()

      fixture.pressEditItemButton()

      expect(fixture.tree).toContainReact(EDIT_VIEW)
    })

    describe('on submit', () => {
      it('should submit', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.pressEditItemButton()
        await fixture.submitEditItem(newItem)

        expect(fixture.onEditItem).toHaveBeenCalledWith(newItem)
      })

      it('should hide the edit item view on success and show list', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.givenThatEditItemSubmissionSucceeds()

        fixture.pressEditItemButton()
        await fixture.submitEditItem(newItem)

        expect(fixture.tree).not.toContainReact(EDIT_VIEW)
      })

      it('should stay on edit item view on failure', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.givenThatEditItemSubmissionFails()

        fixture.pressEditItemButton()
        await fixture.submitEditItem(newItem)

        expect(fixture.tree).toContainReact(EDIT_VIEW)
      })
    })

    describe('on cancel', () => {
      it('should not submit', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.pressEditItemButton()
        fixture.cancelSubmitEditItem()

        expect(fixture.onEditItem).not.toHaveBeenCalled()
      })

      it('should keep edit item view visible', async () => {
        const newItem = { id: '123' }
        const fixture = new Fixture()

        fixture.pressEditItemButton()
        fixture.cancelSubmitEditItem()

        expect(fixture.tree).toContainReact(EDIT_VIEW)
      })
    })
  })
})

class Fixture {
  tree: ReactWrapper

  onAddItem = jest.fn()
  onEditItem = jest.fn()

  listItemProps!: AdminCrudViewListProps<any>
  editProps!: AdminCrudViewEditProps<any, any>
  addProps!: AdminCrudViewAddProps<any>

  constructor(props: Partial<AdminCrudViewProps<any, any, any>> = {}) {
    this.tree = mount(
      <AdminCrudView<{ id: string }>
        items={[{ id: 'a' }]}
        onAddItem={this.onAddItem}
        onEditItem={this.onEditItem}
        renderEditItem={props => {
          this.editProps = props
          return EDIT_VIEW
        }}
        renderListItem={props => {
          this.listItemProps = props
          return LIST_ITEM_VIEW
        }}
        renderAddItem={props => {
          this.addProps = props
          return ADD_VIEW
        }}
        {...props}
      />,
    )
  }

  pressAddItemButton() {
    this.tree
      .find(FloatingActionButton)
      .props()
      .onClick(someSyntheticEvent())

    this.tree.update()
  }

  pressEditItemButton() {
    this.listItemProps.onEdit()

    this.tree.update()
  }

  async cancelSubmitEditItem() {
    await this.editProps.onCancel()
    this.tree.update()
  }

  async cancelSubmitNewItem() {
    await this.addProps.onCancel()
    this.tree.update()
  }

  async submitNewItem(item: any) {
    await this.addProps.onSave(item)
    this.tree.update()
  }

  async submitEditItem(item: any) {
    await this.editProps.onSave(item)
    this.tree.update()
  }

  givenThatNewItemSubmissionSucceeds() {
    this.onAddItem.mockReturnValue(Promise.resolve())
  }

  givenThatNewItemSubmissionFails() {
    this.onAddItem.mockReturnValue(Promise.reject())
  }

  givenThatEditItemSubmissionSucceeds() {
    this.onEditItem.mockReturnValue(Promise.resolve())
  }

  givenThatEditItemSubmissionFails() {
    this.onEditItem.mockReturnValue(Promise.reject())
  }
}

const EDIT_VIEW = <span id="EDIT_VIEW" />
const LIST_ITEM_VIEW = <span id="LIST_ITEM" />
const ADD_VIEW = <span id="ADD_VIEW" />

const SUCCESS_NOTIFICATION = <span>SUCCESS_NOTIFICATION</span>
const FAILURE_NOTIFICATION = <span>FAILURE_NOTIFICATION</span>
