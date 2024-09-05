import React from "react";
import { render, screen } from "@testing-library/react";

import CollegeDetailsEditDialogComponent from "../CollegeDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders collegeDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CollegeDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("collegeDetails-edit-dialog-component")).toBeInTheDocument();
});
