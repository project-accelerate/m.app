import { getCustomRepository } from "typeorm";
import { EventRepository } from "../db/EventRepository";
import { EventProps } from "../domain/Event";
import { someString } from "../../../test/testUtils";

export function someEventProps(props: Partial<EventProps> = {}): EventProps {
  return {
    name: someString(),
    ...props
  }
}

export function givenThatAnEventExists(eventProps = someEventProps()) {
  return getCustomRepository(EventRepository).insert(eventProps)
}
