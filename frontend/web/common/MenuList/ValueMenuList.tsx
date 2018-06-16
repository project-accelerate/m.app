import * as React from "react";
import { MenuList, MenuItem } from "@material-ui/core";

interface ValueMenuListProps<T> {
  /** Options to render in the menu */
  options: T[]

  /** Current selected option */
  value: T

  /** Fired to request selection change */
  onChange: (value: T) => void

  /** Render a menu option */
  format?: (x: T) => React.ReactNode
}

/**
 * Render a selectable list of options, hilighting the selected value
 */
export function ValueMenuList<T>({ options, value, onChange, format = (x: Object) => x.toString() }: ValueMenuListProps<T>) {
  const getKey = (x: T) => {
    const formatted = format(x)
    return x && x.toString()
  }

  return (
    <MenuList>
    {
      options.map(x =>
        <MenuItem
          key={getKey(x)}
          selected={x === value}
          onClick={() => onChange(x)}
        >
          {format(x)}
        </MenuItem>
      )
    }
    </MenuList>
  )
}
