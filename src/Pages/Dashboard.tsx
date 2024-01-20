import React, { useContext, useState, useEffect } from 'react';
import stateContext from '../Context/MyContext';
import { TextField, Button } from '@mui/material';
import "../Styles/Dashboard.css";
import Details from './Details';
import Error from '../components/pages/Error';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { setPNum, pnum, coll, arr }: any = useContext(stateContext);
    const navigate = useNavigate();
    const [show, setShow] = useState<boolean>(false);
    const [reg, setReg] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const [bColor, setBColor] = useState("rgba(69, 216, 113, 0.756)");
    const [message, setMessage] = useState<string>("");
    let formContent = {
        id: "",
        name: "",
        vehicleNo: "",
        time: "",
        error: {
            name: "",
            vehicleNo: ""
        }
    }


    const [formData, setFormData] = useState(formContent);

    const handleSubmit = (e: any) => {

        e.preventDefault();


        if (pnum >= 1) {
            arr.length = 0
            for (let i = 1; i <= pnum; i++) {

                arr.push({ id: i, active: false });
                coll.push({ id: i });
            }

            setShow(true);

        }
        else {
            setMessage("Enter a Valid Number")
            setErr(true);

        }
    }

    const createRegister = () => {
        if (coll.length >= 1) {
            setReg(true)
        } else {
            setMessage("Space Not Available");
            setErr(true);
        }

    }

    window.onbeforeunload = function () { localStorage.removeItem("key"); return ''; };

    useEffect(() => {
        const items = localStorage.getItem("key");
        (items) && setShow(true);

    }, [])
    const handleNavigate = (id: any, time: any) => {
        const value = JSON.stringify(arr);
        localStorage.setItem("key", value)
        navigate("/bill", { state: { id: id, time: time } })
    }


    return (

        !reg ? <div className='outer-cont'>

            <h2 className='title'>Parking Lot</h2>
            {!show && <form onSubmit={handleSubmit} data-testid="myform">
                <TextField variant="standard" label="Number of Parkings Available" type='number' onChange={(e) => { setPNum(e.target.value) }} className='input' />
                <Button variant='contained' type='submit' className='sub-btn'>Submit</Button>
            </form>}
            {show && <Button variant="outlined" className='detail-btn' onClick={() => createRegister()}>Enter Vehicle Details</Button>}
            {show &&
                <div className='park-cont'>

                    {arr.map((ele: any) => {
                        console.log(ele);
                        return (
                            <div className='space-cont' key={ele.id} id={ele.id} style={{ backgroundColor: ele.active ? "rgb(201,56,40)" : bColor }}>
                                <p className='id-info'>{ele.id}</p>
                                <p className='info'>{ele.name ? ele.name : ""}</p>
                                <p className='info'>{ele.vehicleNo ? ele.vehicleNo : ""}</p>
                                <p className='info'>{ele.time ? ele.time : ""}</p>
                                {ele.active && <Button variant="text" className='exit-btn' onClick={() => handleNavigate(ele.id, ele.time)} sx={{ backgroundColor: ele.active ? "white" : "rgb(32, 49, 59)" }} data-testid={`btn${ele.id}`} >Exit</Button>}

                            </div>
                        )
                    })}
                </div>
            }
            {err && <Error setErr={setErr} message={message} />}
        </div>

            :
            <Details setReg={setReg} formContent={formContent} formData={formData} setFormData={setFormData} />


    )
}

export default Dashboard

