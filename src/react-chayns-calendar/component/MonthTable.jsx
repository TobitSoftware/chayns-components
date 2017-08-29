import React from 'react';
import classNames from 'classnames';


const DAYS = ["Mo","Di","Mi","Do","Fr","Sa","So"];

export default class MonthTable extends React.Component{
    render(){
        let _table = this.createTable();
        return(
            <div className="month__table noselect">
                <div className="day__row">
                    {DAYS.map((day,index)=>{
                        return(<div
                            className="day__item day-text chayns__color--100"
                            key={index}
                        >{day}</div>)
                    })}
                </div>
                {_table.map((row,index)=>{                                                      //TODO: SELECTED DATE SHOULD NOT HAVE EVENT LISTENER
                    return(<div className="day__row" key={index}>
                        {row.map((day,index)=>{

                            let _active = this.props.activateAll;
                            let _selected = false;
                            let _marked = false;
                            let _highlighted = false;
                            let _onClick = false;
                            let _className = `day__item day-in-month`;
                            let _style = {};

                            if(_active){
                                _onClick = true;
                            }
                            if(this.props.activated){
                                for (let i = 0; i < this.props.activated.length; i++) {
                                    if (this.props.activated[i].getYear() === day.date.getYear() && this.props.activated[i].getMonth() === day.date.getMonth() && this.props.activated[i].getDate() === day.date.getDate()) {
                                        _active = true;
                                        _marked = true;
                                        _onClick = true;
                                        break;
                                    }
                                }
                            }
                            if(this.props.selected && this.props.selected.getYear() === day.date.getYear()&& this.props.selected.getMonth() === day.date.getMonth() && this.props.selected.getDate() === day.date.getDate()) {
                                _active = true;
                                _selected = true;//`-is-active-is-selected${_marked} chayns__color--100`;
                            }
                            if(this.props.highlighted instanceof Array){
                                for(let k = 0; k < this.props.highlighted.length; k++){
                                    for(let l = 0; this.props.highlighted[k].dates && l < this.props.highlighted[k].dates.length; l++){
                                        if (this.props.highlighted[k].dates[l].getYear() === day.date.getYear() && this.props.highlighted[k].dates[l].getMonth() === day.date.getMonth() && this.props.highlighted[k].dates[l].getDate() === day.date.getDate()) {
                                            _active = true;
                                            _marked = true;
                                            _onClick = true;
                                            _highlighted = true;
                                            if(this.props.highlighted[k].color) {
                                                _style.backgroundColor = `${this.props.highlighted[k].color}`;
                                            }
                                        }
                                    }
                                }
                            }else{
                                if(this.props.highlighted && this.props.highlighted.dates) {
                                    for (let k = 0; k < this.props.highlighted.dates.length; k++) {
                                        if (this.props.highlighted.dates[k].getYear() === day.date.getYear() && this.props.highlighted.dates[k].getMonth() === day.date.getMonth() && this.props.highlighted.dates[k].getDate() === day.date.getDate()) {
                                            _active = true;
                                            _marked = true;
                                            _onClick = true;
                                            _highlighted = true;
                                            if (this.props.highlighted.color) {
                                                _style.backgroundColor = `${this.props.highlighted.color}`;
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if(day.inMonth) {
                                _className = classNames('day__item day-in-month', {
                                    'is-active': _active,
                                    'is-deactive': !_active,
                                    'is-selected': _selected,
                                    'is-marked': _marked,
                                    'is-marked-is-highlighted': _marked && _highlighted,
                                    'chayns__background-color--80 chayns__color--5': _active && _marked,
                                    'chayns__background-color--80': !_active && _marked && !_selected

                                });

                                if(_onClick && this.props.onDateSelect){
                                    return(<div className={_className} style={_style} key={index} onClick={()=>this.props.onDateSelect(day.date)}>
                                        {day.date.getDate()}
                                    </div>)
                                }else{
                                    return(<div className={_className} style={_style} key={index}>
                                        {day.date.getDate()}
                                    </div>)
                                }
                            }else{
                                return(
                                    <div className="day__item day-out-month" key={index}>
                                        {day.date.getDate()}
                                    </div>
                                );
                            }
                        })}
                    </div>);
                })}
            </div>
        )
    }

    createTable(){
        let _table = [];
        let normal_week_start;
        if(this.props.startDate.getDay()>0){
            normal_week_start = new Date(this.props.startDate.getFullYear(),this.props.startDate.getMonth(),(9-this.props.startDate.getDay()));
        }else{
            normal_week_start = new Date(this.props.startDate.getFullYear(),this.props.startDate.getMonth(),(2-this.props.startDate.getDay()));
        }
        for(let i = 0; i<6 ; i++){
            let _row = [];
            if(i===0){
                if(this.props.startDate.getDay()>0) {
                    for (let j = 2; j <= this.props.startDate.getDay(); j++) {
                        _row.push({
                            date: new Date(this.props.startDate.getFullYear(), this.props.startDate.getMonth(), (this.props.startDate.getDay() * -1) + j),
                            inMonth: false
                        });
                    }
                    for (let k = 1; k <= (8 - this.props.startDate.getDay()); k++) {
                        _row.push({
                            date: new Date(this.props.startDate.getFullYear(), this.props.startDate.getMonth(), k),
                            inMonth: true
                        })
                    }
                }else{
                    for (let j = 6; j>0; j--){
                        _row.push({
                            date: new Date(this.props.startDate.getFullYear(), this.props.startDate.getMonth(), this.props.startDate.getDay()-j),
                            inMonth: false
                        })
                    }
                    _row.push({
                        date: new Date(this.props.startDate.getFullYear(), this.props.startDate.getMonth(), this.props.startDate.getDate()),
                        inMonth: true
                    })
                }
            }else{
                for(let j = 0; j<7; j++){
                    let _date = new Date(normal_week_start.getFullYear(), normal_week_start.getMonth(), normal_week_start.getDate() + j);
                    if(_date.getMonth()=== this.props.startDate.getMonth()){
                        _row.push({
                            date: _date,
                            inMonth: true
                        });
                    }else{
                        _row.push({
                            date: _date,
                            inMonth: false
                        });
                    }
                }
                normal_week_start = new Date(normal_week_start.getFullYear(),normal_week_start.getMonth(),normal_week_start.getDate()+7);
            }
            _table.push(_row);
        }
        return _table;
    }
};
