import { render, screen, fireEvent } from "@testing-library/react";
import Billing from "./Billing";
import { MemoryRouter, useLocation } from "react-router-dom";
import { createMemoryHistory } from 'history';
import stateContext from "../Context/MyContext";
import axios from "axios";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),

}))

const contextMockValue = {
    pnum: 1,
    setPNum: jest.fn(),
    arr: [{ id: "1", active: true, name: "njn", vehicleNo: "bhksbf", time: "Aug 10 2023 12:32:45" }, { id: "2", active: true, name: "uhio", vehicleNo: "iuoi", time: "Aug 10 2023 3:32:45" }],
    setArr: jest.fn(),
    rnum: 0,
    setRNum: jest.fn(),
    coll: [],
    setColl: jest.fn(),
}

describe("Billing", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })


    test("rendering the Title", () => {
        (useLocation as jest.Mock).mockReturnValue({
            state: {
                time: "" + new Date(),
                id: "1"
            }
        })
        render(<stateContext.Provider value={contextMockValue}><MemoryRouter><Billing /></MemoryRouter></stateContext.Provider>);

        const Bill_title = screen.getByRole("heading", { level: 1 });
        expect(Bill_title).toBeInTheDocument();
    })
    test("rendering the Title", () => {
        (useLocation as jest.Mock).mockReturnValue({
            state: ""
        })
        render(<stateContext.Provider value={contextMockValue}><MemoryRouter><Billing /></MemoryRouter></stateContext.Provider>);

        const Bill_title = screen.getByTestId("loading-component");
        expect(Bill_title).toBeInTheDocument();
    })

    test("checking for handle Submit Button ", async () => {
        const history = createMemoryHistory();
        (useLocation as jest.Mock).mockReturnValue({
            state: {
                time: "Aug 10 2023 12:23:45",
                id: "1"
            }
        })


        const payHandle = jest.fn();

        const mockResolved = {
            data: {
                "car-registration": "hbjlk",
                "charge": 10,
            }
        };

        (axios.post as jest.Mock).mockResolvedValue(mockResolved);
        render(<stateContext.Provider value={contextMockValue}><MemoryRouter ><Billing /></MemoryRouter></stateContext.Provider>);

        screen.debug();
        const pay_btn = screen.getByRole("button", { name: "Pay" });
        fireEvent.click(pay_btn, payHandle());
        expect(payHandle).toHaveBeenCalledTimes(1);




    })


})

describe("check for if ", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    }
    )
    test("if block", () => {
        (useLocation as jest.Mock).mockReturnValue({
            state: {
                time: "" + new Date(),
                id: "1"
            }
        })
        const mockResolved = {
            data: {
                "car-registration": "hbjlk",
                "charge": 10,
            }
        };
        const payHandle = jest.fn();
        (axios.post as jest.Mock).mockResolvedValue(mockResolved);
        render(<stateContext.Provider value={contextMockValue}><MemoryRouter initialEntries={['/details']}><Billing /></MemoryRouter></stateContext.Provider>);
        const pay_btn = screen.getByRole("button", { name: "Pay" });
        fireEvent.click(pay_btn, payHandle());
        expect(payHandle).toHaveBeenCalledTimes(1);


    })
})