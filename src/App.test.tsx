import { render } from '@testing-library/react';

import App from './App';

describe("Test App", () => {
  test("App is correctly rendered", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
