import React, { createContext, useState } from "react";

export interface pDetail {
    // name: string;
    // vehicleNo: string;
    // time?: string;
    id: string
}
type arrProp = {
    id: string,
    name?: string,
    time?: string,
    vehicleNo?: string,
    active: boolean
}

interface ContextValue {
    pnum: number | undefined;
    setPNum: React.Dispatch<React.SetStateAction<number | undefined>>;
    arr: arrProp[] | undefined;
    setArr: React.Dispatch<React.SetStateAction<arrProp[] | []>>;
    rnum: number | undefined;
    setRNum: React.Dispatch<React.SetStateAction<number | undefined>>;
    coll: pDetail[] | undefined;
    setColl: React.Dispatch<React.SetStateAction<pDetail[] | undefined>>;
}

const stateContext = createContext<ContextValue | undefined>({
    pnum: 0,
    setPNum: () => { },
    arr: [],
    setArr: () => { },
    rnum: 0,
    setRNum: () => { },
    coll: [],
    setColl: () => { },
});

export default stateContext;
// export const ContextProvider: React.FC<any> = ({ children }) => {
//     const [pnum, setPNum] = useState<number | undefined>(0);
//     const [arr, setArr] = useState<arrProp[]>([]);
//     const [rnum, setRNum] = useState<number | undefined>();
//     const [coll, setColl] = useState<pDetail[] | undefined>([]);

//     return (
//         <stateContext.Provider value={{ pnum, setPNum, rnum, setRNum, coll, setColl, arr, setArr }}>
//             {children}
//         </stateContext.Provider>
//     );
// };
