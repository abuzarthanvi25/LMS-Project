import { Box } from '@mui/material'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import AnimatedProgressProvider from '../animated-divs/animated-progress-provider';
import { easeQuadInOut, easeBackIn } from "d3-ease";

const StatisticsCard = ({ value = 0, progressText = '', maxValue = 10, minValue = 0, children, strokeWidth = 5 }) => {
    return (
        <Box style={{ width: '260px', height: 'auto' }}>
            <AnimatedProgressProvider valueStart={0}
                valueEnd={value}
                duration={3}
                easingFunction={easeQuadInOut}
                >
                {value => {
                    return (
                        <CircularProgressbarWithChildren styles={buildStyles({ pathTransition: "none" })} strokeWidth={strokeWidth} value={value} minValue={minValue} maxValue={maxValue} text={progressText} >
                            {children}
                        </CircularProgressbarWithChildren>
                    );
                }}

            </AnimatedProgressProvider>
        </Box>
    )
}

export default StatisticsCard