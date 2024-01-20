import React from "react";
import { App } from "../../../src/App";
import { render, waitFor } from "../../utils";

test("renders the App component and has initial dialog", async () => {
  const { getByText } = render(<App />);

  await waitFor(() => {
    expect(getByText("Create a user")).toBeInTheDocument();
  });
});
