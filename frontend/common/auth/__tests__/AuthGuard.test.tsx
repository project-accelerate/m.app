import * as React from 'react'
import { mount } from 'enzyme';
import { mock, instance, when, anything } from 'ts-mockito';
import { AuthToken } from 'common/AuthToken';
import { someAuthTokenPayload } from 'common/test/testUtils';

import { TokenManager } from '../TokenManager';
import { TokenState } from '../TokenState';
import { AuthGuardProvider, createGuard, LoggedInGuard, createRoleAuthorizationGuard } from '../AuthGuard';

describe('AuthGuard', () => {
  it('renders children when guard passes', () => {
    const fixture = new Fixture()
    fixture.givenAnAuthenticatedUser()
    
    const tree = fixture.render(
      <LoggedInGuard>
        {CHILD_ELEMENT}
      </LoggedInGuard>
    )

    expect(tree).toContainReact(CHILD_ELEMENT)
  })

  it('does not render children when guard fails', () => {
    const fixture = new Fixture()
    fixture.givenNoAuthenticatedUser()
    
    const tree = fixture.render(
      <LoggedInGuard>
        {CHILD_ELEMENT}
      </LoggedInGuard>
    )

    expect(tree).not.toContainReact(CHILD_ELEMENT)
  })

  it('renders render callback when guard passes', () => {
    const fixture = new Fixture()
    fixture.givenAnAuthenticatedUser()
    
    const tree = fixture.render(
      <LoggedInGuard
        render={() => CHILD_ELEMENT}
      />
    )

    expect(tree).toContainReact(CHILD_ELEMENT)
  })

  it('renders else callback when guard fails', () => {
    const fixture = new Fixture()
    fixture.givenNoAuthenticatedUser()
    
    const tree = fixture.render(
      <LoggedInGuard
        elseRender={() => CHILD_ELEMENT}
      />
    )

    expect(tree).toContainReact(CHILD_ELEMENT)
  })

  it('renders else callback when guard fails', () => {
    const fixture = new Fixture()
    fixture.givenNoAuthenticatedUser()

    const tree = fixture.render(
      <LoggedInGuard
        elseRender={() => CHILD_ELEMENT}
      />
    )

    expect(tree).toContainReact(CHILD_ELEMENT)
  })

  it('renders element in render prop', () => {
    const fixture = new Fixture()
    fixture.givenAnAuthenticatedUser()
    
    const tree = fixture.render(
      <LoggedInGuard
        render={CHILD_ELEMENT}
      />
    )

    expect(tree).toContainReact(CHILD_ELEMENT)
  })

  it('passes context to render callback', () => {
    const fixture = new Fixture()
    fixture.givenAnAuthenticatedUser()

    const renderCallback = jest.fn()
    
    const tree = fixture.render(
      <LoggedInGuard
        render={renderCallback}
      />
    )

    expect(renderCallback).toHaveBeenCalledWith({
      token: instance(fixture.state),
      manager: instance(fixture.manager)
    })
  })

  describe('given a role based authentication check', () => {
    const FooAndBarGuard = createRoleAuthorizationGuard(['foo', 'bar'])

    it('accepts user with all required roles', () => {
      const fixture = new Fixture()
      fixture.givenUserRole('foo')
      fixture.givenUserRole('bar')
  
      const tree = fixture.render(
        <FooAndBarGuard
          render={CHILD_ELEMENT}
        />
      )
  
      expect(tree).toContainReact(CHILD_ELEMENT)
    })

    it('rejects user missing required roles', () => {
      const fixture = new Fixture()
      fixture.givenUserRole('foo')
  
      const tree = fixture.render(
        <FooAndBarGuard
          render={CHILD_ELEMENT}
        />
      )
  
      expect(tree).not.toContainReact(CHILD_ELEMENT)
    })
  })
})

class Fixture {
  state = mock(TokenState)
  manager = mock(TokenManager)

  constructor() {
    when(this.manager.current)
      .thenReturn(instance(this.state))
  }

  render(node: React.ReactElement<{}>) {
    return mount(
      <AuthGuardProvider tokenManager={instance(this.manager)}>
        {node}
      </AuthGuardProvider>
    )
  }

  givenUserRole(role: string) {
    when(this.state.hasRole(role))
      .thenReturn(true)
  }

  givenAnAuthenticatedUser() {
    when(this.state.authProps)
      .thenReturn(someAuthTokenPayload())
  }

  givenNoAuthenticatedUser() {
    when(this.state.authProps)
      .thenReturn(undefined)
  }
}

const CHILD_ELEMENT = <span id="content" />
