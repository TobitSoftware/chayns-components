import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PersonFinder extends Component {
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        className: null,
        placeholder: '',
        defaultValue: null,
        onChange: null
    };

    state = {
        results: []
    };

    handleOnChange = (event) => {
        const { value } = event.target;

        if (value.length < 3) {
            return;
        }

        chayns.findPerson(value)
            .then((data) => {
                this.setState({
                    results: data.Value
                });
            });
    };

    render() {
        const { className, ...props } = this.props;
        const { results } = this.state;

        const classNames = classnames('input', className);

        return (
            <div className="person-finder">
                <input
                    type="text"
                    className={classNames}
                    {...props}
                    onChange={this.handleOnChange}
                />
                <div className="person-finder__results scrollbar">
                    {results.map(r => (
                        <div className="result">
                            <div className="img">
                                <img src={`https://sub60.tobit.com/u/${r.personId}?size=40`} alt="img"/>
                            </div>
                            <div className="text">
                                <div className="name">
                                    {r.name}
                                </div>
                                <div className="person-id">
                                    {`chayns® ID: ${r.personId}`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
