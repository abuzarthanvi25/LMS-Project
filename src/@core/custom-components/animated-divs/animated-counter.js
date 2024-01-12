import React from "react";
import CountUp from "react-countup";

export default function AnimatedCounter({ number, duration = 3 }) {
    return (
        <CountUp style={{fontSize:'2.3rem ', fontWeight: 'bold'}} duration={duration} end={number} />
    );
}
