export const someString = () => "Foo"

export const someEvent = (props: any = {}) => ({
  ...props,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn()
})

export const someEventWithValue = (value: any) => someEvent({
  currentTarget: { value }
})
