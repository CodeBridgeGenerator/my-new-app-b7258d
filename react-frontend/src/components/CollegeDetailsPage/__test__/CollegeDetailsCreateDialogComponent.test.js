import React from "react";
import { render, screen } from "@testing-library/react";

import CollegeDetailsCreateDialogComponent from "../CollegeDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders collegeDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CollegeDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("collegeDetails-create-dialog-component")).toBeInTheDocument();
});
