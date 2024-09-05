import React from "react";
import { render, screen } from "@testing-library/react";

import CollegeDetailsPage from "../CollegeDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders collegeDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CollegeDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("collegeDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("collegeDetails-add-button")).toBeInTheDocument();
});
