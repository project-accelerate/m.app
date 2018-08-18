import { mock, instance, when } from "ts-mockito";
import { someDate } from "common/test/testUtils";
import { DateProvider } from "../DateProvider";

export class MockDateProviderFixture {
  mock = mock(DateProvider)
  instance = instance(this.mock)
  date = someDate()

  constructor() {
    this.givenCurrentDate(this.date)
  }

  givenCurrentDate(date: Date) {
    when(this.mock.now())
      .thenReturn(date)
  }
}
