import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import stateContext from "../Context/MyContext";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";


jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),

}))

global.alert = jest.fn();
const contextmockvalue = {
    pnum: 1,
    setPNum: jest.fn(),
    arr: [],
    setArr: jest.fn(),
    rnum: 0,
    setRNum: jest.fn(),
    coll: [],
    setColl: jest.fn(),
}

const localStorageMock = (() => {
    let store: any = {};

    return {
        getItem: (key: any) => store[key] || null,
        setItem: (key: any, value: any) => { store[key] = value.toString(); },
        removeItem: (key: any) => delete store[key],
        clear: () => { store = {} }

    }
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe("Dashboard", () => {

    test("Intial rendering of the document ", () => {
        render(<Dashboard />);

        act(() => window.dispatchEvent(new Event("beforeunload")));

        expect(localStorageMock.getItem('key')).toBeNull();
    })

    test("Rendering the Title", () => {
        render(<Dashboard />);
        const mytitle = screen.getByRole("heading", { level: 2 });
        expect(mytitle).toBeInTheDocument();
    })

    test("rendering and checking input and submit button", () => {


        const handleSubmit = jest.fn();
        render(<stateContext.Provider value={contextmockvalue}><Dashboard /></stateContext.Provider>);

        const myinp = screen.getByRole("spinbutton");
        fireEvent.change(myinp, { target: { value: 2 } });
        expect(myinp).toHaveValue(2);

        const submit = screen.getByTestId("myform");
        fireEvent.submit(submit, handleSubmit());

        expect(handleSubmit).toHaveBeenCalledTimes(1);


    })
    test("rendering and checking input and submit button else block", () => {

        const contextmockvalue = {
            pnum: 0,
            setPNum: jest.fn(),
            arr: [],
            setArr: jest.fn(),
            rnum: 0,
            setRNum: jest.fn(),
            coll: [],
            setColl: jest.fn(),
        }
        const handleSubmit = jest.fn();
        render(<stateContext.Provider value={contextmockvalue}><Dashboard /></stateContext.Provider>);

        const myinp = screen.getByRole("spinbutton");
        fireEvent.change(myinp, { target: { value: 0 } });
        expect(myinp).toHaveValue(0);

        const submit = screen.getByTestId("myform");
        fireEvent.submit(submit, handleSubmit());

        expect(handleSubmit).toHaveBeenCalledTimes(1);


    })
    test("rendering the button of Enter vehicle Details ", () => {


        const handleSubmit = jest.fn();
        const handleDetails = jest.fn();
        render(<stateContext.Provider value={contextmockvalue}><Dashboard /></stateContext.Provider>);

        const myinp = screen.getByRole("spinbutton");
        fireEvent.change(myinp, { target: { value: 0 } });


        const submit = screen.getByTestId("myform");
        fireEvent.submit(submit, handleSubmit());

        const vehicleD = screen.getByRole("button", {
            name: /Enter Vehicle Details/i
        });


        fireEvent.click(vehicleD, handleDetails());


        expect(handleDetails).toHaveBeenCalledTimes(1);

    })

    test("rendering the button of Enter vehicle Details ", () => {


        const handleSubmit = jest.fn();
        const handleDetails = jest.fn();
        const handleDetailSubmit = jest.fn();
        render(<stateContext.Provider value={contextmockvalue}><Dashboard /></stateContext.Provider>);

        const myinp = screen.getByRole("spinbutton");
        fireEvent.change(myinp, { target: { value: 0 } });


        const submit = screen.getByTestId("myform");
        fireEvent.submit(submit, handleSubmit());

        const vehicleD = screen.getByRole("button", {
            name: /Enter Vehicle Details/i
        });


        fireEvent.click(vehicleD, handleDetails());


        const Nameip = screen.getByRole("textbox", { name: /Name/i });
        fireEvent.change(Nameip, { target: { value: "xxx" } })

        const vehip = screen.getByRole("textbox", { name: /Vehicle Number/i });
        fireEvent.change(vehip, { target: { value: "xxx-123" } })

        const detail_Sub = screen.getByRole("button");
        fireEvent.submit(detail_Sub, handleDetailSubmit());

        expect(handleDetailSubmit).toHaveBeenCalledTimes(1);

    })
    test("rendering the button of Enter vehicle Details ", () => {


        const handleSubmit = jest.fn();
        const handleDetails = jest.fn();
        const handleDetailSubmit = jest.fn();
        render(<stateContext.Provider value={contextmockvalue}><Dashboard /></stateContext.Provider>);

        const myinp = screen.getByRole("spinbutton");
        fireEvent.change(myinp, { target: { value: 0 } });


        const submit = screen.getByTestId("myform");
        fireEvent.submit(submit, handleSubmit());

        const vehicleD = screen.getByRole("button", {
            name: /Enter Vehicle Details/i
        });


        fireEvent.click(vehicleD, handleDetails());


        const Nameip = screen.getByRole("textbox", { name: /Name/i });
        fireEvent.change(Nameip, { target: { value: "" } })

        const vehip = screen.getByRole("textbox", { name: /Vehicle Number/i });
        fireEvent.change(vehip, { target: { value: "xxx-123" } })

        const detail_Sub = screen.getByRole("button");
        fireEvent.submit(detail_Sub, handleDetailSubmit());

        expect(handleDetailSubmit).toHaveBeenCalledTimes(1);


    })

    test("handleCose on clicking close icon ", () => {
        const handleSubmit = jest.fn();
        const handleDetails = jest.fn();

        const closeHandle = jest.fn();
        render(<stateContext.Provider value={contextmockvalue}><Dashboard /></stateContext.Provider>);

        const myinp = screen.getByRole("spinbutton");
        fireEvent.change(myinp, { target: { value: 0 } });


        const submit = screen.getByTestId("myform");
        fireEvent.submit(submit, handleSubmit());

        const vehicleD = screen.getByRole("button", {
            name: /Enter Vehicle Details/i
        });


        fireEvent.click(vehicleD, handleDetails());

        screen.debug();
        const closeI = screen.getByTestId("closeIcon");
        fireEvent.click(closeI, closeHandle());
        expect(closeHandle).toHaveBeenCalledTimes(1);
        screen.debug();
    })
    test("rendering the exit button on onClick ", async () => {


        const handleSubmit = jest.fn();
        const handleDetails = jest.fn();
        const handleDetailSubmit = jest.fn();
        const exitHandle = jest.fn();
        render(<stateContext.Provider value={contextmockvalue}><Dashboard /></stateContext.Provider>);

        const myinp = screen.getByRole("spinbutton");
        fireEvent.change(myinp, { target: { value: 0 } });


        const submit = screen.getByTestId("myform");
        fireEvent.submit(submit, handleSubmit());

        const vehicleD = screen.getByRole("button", {
            name: /Enter Vehicle Details/i
        });


        fireEvent.click(vehicleD, handleDetails());


        const Nameip = screen.getByRole("textbox", { name: /Name/i });
        fireEvent.change(Nameip, { target: { value: "xxx" } })

        const vehip = screen.getByRole("textbox", { name: /Vehicle Number/i });
        fireEvent.change(vehip, { target: { value: "xxx-123" } })

        const detail_Sub = screen.getByRole("button");
        fireEvent.submit(detail_Sub, handleDetailSubmit());

        await waitFor(() => {
            const exit_btn = screen.getByTestId("btn1")
            fireEvent.click(exit_btn, exitHandle());
        });


        expect(exitHandle).toHaveBeenCalledTimes(1);


    })
})