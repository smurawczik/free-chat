import { ThemeProvider } from "@emotion/react";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { afterEach } from "vitest";
import { store } from "../src/store/store";
import { theme } from "../src/theme";

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    ),
    ...options,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
