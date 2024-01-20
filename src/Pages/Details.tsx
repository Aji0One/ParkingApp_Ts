import React, { useContext, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import stateContext from '../Context/MyContext';
import { Button } from "@mui/material";
import "../Styles/Details.css";
import CloseIcon from '@mui/icons-material/Close';


interface FromProps {
    formData: any,
    setFormData: any,
    formContent: any,
    setReg: any,

}

function Details({ formData, setFormData, formContent, setReg }: FromProps) {
    const { coll, arr, rnum, setRNum, setArr, setColl }: any = useContext(stateContext);

    const times = new Date().toString().split(" ");
    const tie = "" + times[1] + " " + times[2] + " " + times[3] + " " + times[4];

    const Random = (num: number) => Math.floor(Math.random() * num);

    useEffect(() => {
        setRNum(Random(coll.length));

    }, [])

    const handleChange = (e: any) => {
        let error = { ...formData.error };
        if (e.target.value === "") {
            error[e.target.name] = `${e.target.name} is Required`;

        }
        else {
            error[e.target.name] = ""
        }
        setFormData({ ...formData, [e.target.name]: e.target.value, error })
    }

    const handleSubmit = async (e: any) => {

        e.preventDefault();
        console.log(rnum);
        formData.time = tie;
        formData.id = coll[rnum].id;
        const errorKeys = Object.keys(formData).filter((key) => {
            if (formData[key] === "" && key !== 'error' && key !== 'id')
                return key;

        })
        console.log(errorKeys)
        if (errorKeys.length >= 1) {
            alert("Please fill all Details");
        }

        else {

            setColl(coll.filter((ele: any) => ele.id !== coll[rnum].id));
            arr.map((data: any, i: any) => {

                coll.push(arr[i]);
                console.log(coll);

                if (data.id === formData.id) {
                    arr[i] = {
                        name: formData.name,
                        vehicleNo: formData.vehicleNo,
                        time: "" + formData.time,
                        id: formData.id,
                        active: true
                    }



                }

            })
            setReg(false);

        }
        setFormData(formContent);
    }





    return (
        <div className="detail-cont">
            <div className="pop-cont">
                <CloseIcon onClick={() => setReg(false)} className="close-icon" data-testid="closeIcon" />
                <Box
                    component="form"


                    autoComplete="off"
                    style={{ padding: "20px" }}
                    onSubmit={(e) => handleSubmit(e)}
                    className="box-cont"
                    data-testid="myform"
                >
                    <h3 >Parking Register</h3>
                    <TextField id="name"
                        label="Name"
                        name="name"
                        variant="standard"
                        value={formData.name}
                        onChange={handleChange}

                    /><br />
                    <span style={{ color: "red" }}>{formData?.error.name} </span>
                    <br />

                    <TextField id="vehicleNo"
                        label="Vehicle Number"
                        name="vehicleNo"
                        variant="standard"
                        type="text"
                        value={formData.vehicleNo}
                        onChange={handleChange}

                    /><br />
                    <span style={{ color: "red" }}>{formData.error.vehicleNo} </span>
                    <br />
                    <br />
                    <TextField id="time"
                        label="In Time"
                        name="time"
                        type="text"
                        value={tie}
                        // onChange={(e) => handleChange(e)}
                        InputProps={{
                            readOnly: true,
                        }}


                    /><br />


                    <Button variant="contained" type="submit" className="sub-cont">Submit</Button>
                </Box>
            </div>
        </div>
    );
}

export default Details;