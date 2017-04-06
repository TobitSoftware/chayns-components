import React from 'react';

import Week from './Week';


const Navigator = ({text,onClick,hidden,days})=>{
    let schemeColor = Week.hexToRgb(chayns.getSchemeColor());
    return(
        <div className="calendar__navigator no_select">
            <div className="calendar__navigator_wrapper">
                <div className="calendar__navigator_icon">
                    {hidden.left ? '' : (
                        <i className="fa fa-chevron-left" onClick={onClick.left}/>
                    )}
                </div>
                {text}
                <div className="calendar__navigator_icon">
                    {hidden.right ? '' : (
                        <i className="fa fa-chevron-right" onClick={onClick.right}/>
                    )}
                </div>
            </div>
            <div className="calendar__navigator_days">
                {
                    days.map((day,i)=>{
                        return(
                            <div className="calendar__navigator_days_table" key={i}>
                                {day.map((value,i)=>{
                                    let selected = value.selected
                                        ? `bold`
                                        : 'normal';
                                    return (
                                        <div className={`calendar__navigator_days_item ellipsis`} style={{fontWeight:selected}} key={i} onClick={(event)=>onClick.day(event,value)}>
                                            {value.name}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

Navigator.defaultProps = {
    text: ''
};

Navigator.propTypes = {
    text: React.PropTypes.string,
    onClick: React.PropTypes.shape({
        left: React.PropTypes.func.isRequired,
        right: React.PropTypes.func.isRequired,
        day: React.PropTypes.func.isRequired
    }),
    hidden: React.PropTypes.shape({
        left: React.PropTypes.bool,
        right: React.PropTypes.bool
    })
};

export default Navigator;