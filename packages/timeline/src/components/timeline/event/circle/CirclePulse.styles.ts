import styled from 'styled-components';



export const StyledCirclePulseWrapper = styled.div`
    align-items: center;
    height: 35px;
    display: flex;
    transform: translateY(2px);
    
`

export const StyledCirclePulse = styled.div<{color: string}>`
    background: ${props => props.color};
    border-radius: 50%;
    
    margin-left: 8px;
    
    height: 20px;
    width: 20px;
    transform: scale(1);
    
    box-shadow: 0 0 0 0 ${props => props.color};
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 ${props => props.color}b3;
        }

        70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px ${props => props.color}00;
        }

        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 ${props => props.color}00;
        }
    }
`
