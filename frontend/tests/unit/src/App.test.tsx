import { render, waitFor } from "@testing-library/react";
import React from "react";
import { App } from "../../../src/App";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { store } from "../../../src/store/store";
import { theme } from "../../../src/theme/index.ts";

test("renders the App component and has initial dialog", async () => {
  const { getByText } = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );

  await waitFor(() => {
    expect(getByText("Create a user")).toBeInTheDocument();
  });
});
