import React, { useContext, useEffect, useState } from 'react';
import stateContext from '../Context/MyContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import axios from "axios";
import "../Styles/Billing.css";
import parking from "../assets/parking.jpg";
import Loading from '../components/pages/Loading';
const Billing = () => {
    const navigate = useNavigate();
    const [pinfo, setPInfo] = useState<any>();

    const [totalTime, setTotalTime] = useState<any>();
    const [fair, setFair] = useState<any>();
    const { state } = useLocation();
    let time1: any;


    const { arr, coll }: any = useContext(stateContext);
    const times = new Date().toString().split(" ");
    const tie = "" + times[1] + " " + times[2] + " " + times[3] + " " + times[4];
    const tie1 = tie.split(" ");
    const time2 = tie1[tie1.length - 1];

    useEffect(() => {
        arr.map((ele: any) => {
            (ele.id === state.id) && (
                setPInfo(ele)

            )
        })
        if (state) {
            const time = state?.time?.split(" ");
            time1 = time[time.length - 1];
            var [hours1, minutes1, seconds1]: any = time1.split(":");
            var [hours2, minutes2, seconds2]: any = time2.split(":");
        }

        let hour = (hours2 > hours1) ? hours2 - hours1 : hours1 - hours2;
        let min = Math.abs(minutes2 - minutes1);
        let sec = Math.abs(seconds2 - seconds1);
        console.log(minutes2, minutes1);
        console.log(min, sec);
        setTotalTime("" + hour + ":" + min + ":" + sec);
        console.log("" + hour + ":" + min + ":" + sec);
        (min > 30) && (
            hour += 1

        );
        (hour < 2 && hour >= 0) ? (
            setFair(10)
        ) : (
            setFair((hour - 1) * 10)
        );
    }, []);

    const handlePayment = async () => {
        // await axios.post("https://httpstat.us/200", {
        //     "car-registration": pinfo.vehicleNo,
        //     "charge": fair
        // })
        arr.map((data: any, i: any) => {
            console.log(typeof (data), typeof (pinfo));
            console.log(typeof (data.id), typeof (pinfo.id));
            if (data.id === pinfo.id) {
                arr[i] = {

                    active: false,
                    id: pinfo.id
                }
                coll.push(arr[i]);
            }
        })
        console.log("navigate");
        navigate("/");
    }
    return (
        (state) ? <div className='out-cont'>
            <h1 className='bill-title'>Payment</h1>
            <div className='inn-cont'>
                <img src={parking} alt="pic" />
                <div className='cont'>
                    <p className='l-cont'>Name:<span className='b-name'>{pinfo?.name}</span> </p>
                    <p className='l-cont'>Vehicle Number:<span>{pinfo?.vehicleNo}</span></p>
                    <p className='l-cont'>In Time: <span className='r-cont'>{pinfo?.time}</span></p>
                    <p className='l-cont'>Out Time: <span className='r-cont'>{tie}</span></p>
                    <p className='l-cont'>Parking Time:<span className='r-cont'>{totalTime}</span></p>
                    <p className='l-cont'>Bill:<span className='r-cont'>${fair}</span></p>
                    <Button variant="contained" onClick={() => handlePayment()} className='pay-btn'>Pay</Button>
                </div>
            </div>
        </div> : <Loading />
    )
}

export default Billing
