import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './modeSwitch.scss';

import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';

let globalState = { modes: [], activeModeId: 0 };

export default class ModeSwitch extends Component {
    static propTypes = {
        modes: PropTypes.arrayOf(PropTypes.oneOf([
            PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
            PropTypes.shape({ id: PropTypes.number, name: PropTypes.string, uacId: PropTypes.number })
        ])),
        save: PropTypes.bool,
        onChange: PropTypes.func,
        defaultMode: PropTypes.number
    };

    static defaultProps = {
        modes: null,
        save: false,
        onChange: null,
        defaultMode: null
    };

    static getCurrentMode() {
        const { modes, activeModeId } = globalState;
        return modes.find(mode => mode.id === activeModeId || null);
    }

    constructor(props) {
        super(props);

        this.toggleModeSwitch = this.toggleModeSwitch.bind(this);
        this.switchMode = this.switchMode.bind(this);

        window.chayns.ready.then(() => {
            globalState = { modes: this.setModes(props.modes), activeModeId: props.defaultMode || 0 };
            this.state = { ...globalState, open: false };

            const isAdminMode = chayns.addAdminSwitchListener(this.switchMode);
            if (!props.save && !props.defaultMode) {
                if (isAdminMode) {
                    globalState.activeModeId = 1;
                    this.state.activeModeId = 1;
                } else {
                    globalState.activeModeId = 0;
                    this.state.activeModeId = 0;
                }
            }
            const { modes, activeModeId } = this.state;
            props.onChange(modes.find(mode => mode.id === activeModeId));
        });
    }

    componentWillReceiveProps(nextProps) {
        const { modes } = this.props;
        if (nextProps.modes !== modes) {
            this.setState({ modes: this.setModes(nextProps.modes) });
        }
    }

    setModes(modes) {
        let newModes = modes || [];
        const user = newModes.filter(mode => mode.id === 0);
        const admin = newModes.filter(mode => mode.id === 1);
        if (admin.length === 0) {
            newModes.unshift({ id: 1, name: 'chayns® Manager', uacId: 1 });
        }
        if (user.length === 0) {
            newModes.unshift({ id: 0, name: window.chayns.env.user.name, uacId: 0 });
        }
        newModes = newModes.filter(mode => !mode.uacId || this.isUserInGroup(mode.uacId));
        return newModes;
    }

    isUserInGroup(uacId) {
        return window.chayns.env.user.groups.indexOf(group => group.id === uacId) >= 0;
    }

    switchMode(id) {
        const { onChange } = this.props;
        const { modes } = this.state;
        if (id.mode !== undefined) {
            this.setState({ activeModeId: id.mode });
            globalState.activeModeId = id.mode;
            if (onChange) {
                onChange(modes.find(mode => mode.id === id.mode));
            }
        } else {
            if (id === 0) {
                chayns.deactivateAdminMode();
            } else if (id === 1) {
                chayns.activateAdminMode();
            } else if (onChange) {
                onChange(modes.find(mode => mode.id === id));
            }
            this.setState({ activeModeId: id, open: false });
            globalState.activeModeId = id;
        }
    }

    toggleModeSwitch() {
        const { open } = this.state;
        this.setState({ open: !open });
    }

    render() {
        if (this.state) {
            const { modes, open, activeModeId } = this.state;
            return (
                <div className={classNames('cc__modeswitch', { 'cc__modeswitch--open': open })}>
                    <div className="cc__modeswitch__content">
                        <h2>Diese Seite verwenden als:</h2>
                        {
                            modes.map(mode => (
                                <div className="grid__item col-1-2-desktop col-1-1-mobile">
                                    <RadioButton
                                        name="modeSwitchRadioButtons"
                                        value={mode.id}
                                        onChange={this.switchMode}
                                        checked={mode.id === activeModeId}
                                    >
                                        {mode.name}
                                    </RadioButton>
                                </div>
                            ))
                        }
                    </div>
                    <div
                        className={classNames('cc__modeswitch__trigger', { 'cc__modeswitch__trigger--red': activeModeId !== 0 })}
                        onClick={this.toggleModeSwitch}
                    />
                </div>
            );
        }
        return null;
    }
}
