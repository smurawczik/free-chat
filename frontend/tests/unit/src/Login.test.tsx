import React from "react";
import { App } from "../../../src/App";
import { act, fireEvent, render, waitFor } from "../../utils";

test("login from initial dialog", async () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  await waitFor(() => {
    expect(getByText("login")).toBeInTheDocument();
  });

  act(() => {
    getByText("login").click();
  });

  fireEvent.change(getByPlaceholderText("Enter your email address"), {
    target: { value: "admin@localhost" },
  });
  fireEvent.change(getByPlaceholderText("Enter a password"), {
    target: { value: "aaaa" },
  });

  act(() => {
    getByText("Login", { selector: "button" }).click();
  });
});
