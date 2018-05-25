import * as React from 'react'
import { shallow } from "enzyme"
import { ValueMenuList } from "../ValueMenuList";
import { MenuList, MenuItem } from "@material-ui/core";

describe('ValueMenuList', () => {
  it('should select correct item', () => {
    const tree = shallow(
      <ValueMenuList
        options={[1, 2, 3]}
        value={1}
        onChange={jest.fn()}
      />
    )

    expect(tree.find({ children: "1" })).toHaveProp("selected", true)
    expect(tree.find({ children: "2" })).toHaveProp("selected", false)
    expect(tree.find({ children: "3" })).toHaveProp("selected", false)
  })

  it('should change selection', () => {
    const onChange = jest.fn()
    const tree = shallow(
      <ValueMenuList
        options={[1, 2, 3]}
        value={1}
        onChange={onChange}
      />
    )

    tree.find({ children: "2" }).simulate("click")
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
