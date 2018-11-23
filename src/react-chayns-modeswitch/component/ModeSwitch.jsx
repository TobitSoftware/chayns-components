/* eslint-disable jsx-a11y/click-events-have-key-events,class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';
import Icon from '../../react-chayns-icon/component/Icon';

let globalState = {
    modes: [],
    activeModeId: 0
};
const onChangeListener = [];

export default class ModeSwitch extends Component {
    static propTypes = {
        modes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                uacIds: PropTypes.arrayOf(PropTypes.number),
            })
        ),
        save: PropTypes.bool,
        onChange: PropTypes.func,
        defaultMode: PropTypes.number,
        show: PropTypes.bool,
    };

    static defaultProps = {
        modes: null,
        save: false,
        onChange: null,
        defaultMode: null,
        show: false,
    };

    static getCurrentMode() {
        const { modes, activeModeId } = globalState;
        return modes.find(mode => mode.id === activeModeId || null);
    }

    static addChangeListener(callback) {
        onChangeListener.push(callback);
        if (globalState.modes.length > 0) {
            const mode = globalState.modes.find(m => m.id === globalState.activeModeId);
            callback(mode);
        }
    }

    static removeChangeListener(callback) {
        onChangeListener.splice(onChangeListener.indexOf(callback), 1);
    }

    constructor(props) {
        super(props);

        this.toggleModeSwitch = this.toggleModeSwitch.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.init = this.init.bind(this);

        window.chayns.ready.then(() => {
            window.chayns.addAccessTokenChangeListener(this.init);
            this.init();
        });
    }

    componentWillReceiveProps(nextProps) {
        const { modes } = this.props;
        if (chayns.env.user.isAuthenticated && nextProps.modes !== modes) {
            globalState.modes = this.setModes(nextProps.modes);
            this.setState({ modes: globalState.modes });
        }
    }

    onChange(id) {
        const { modes } = this.state;
        const { onChange } = this.props;
        const mode = modes.find(m => m.id === id);
        if (onChange) {
            onChange(mode);
        }
        onChangeListener.forEach((listener) => {
            listener(mode);
        });
    }

    setMode(id) {
        const { save } = this.props;
        this.setState({ activeModeId: id });
        globalState.activeModeId = id;
        if (save) {
            window.chayns.storage.set('react__modeSwitch--currentMode', id);
        }
    }

    setModes(modes) {
        let newModes = modes || [];
        const user = newModes.filter(mode => mode.id === 0);
        const admin = newModes.filter(mode => mode.id === 1);
        if (admin.length === 0) {
            newModes.unshift({
                id: 1,
                name: 'chayns® Manager',
                uacIds: [1]
            });
        }
        if (user.length === 0) {
            newModes.unshift({
                id: 0,
                name: window.chayns.env.user.name
            });
        }
        newModes = newModes.filter(mode => !mode.uacIds || this.isUserInGroup(mode.uacIds));
        return newModes;
    }

    init() {
        const { defaultMode, save, modes } = this.props;
        if (chayns.env.user.isAuthenticated) {
            globalState = {
                modes: this.setModes(modes),
                activeModeId: defaultMode || 0
            };
            this.setState({
                ...globalState,
                open: false
            });

            chayns.removeAdminSwitchListener(this.switchMode);
            chayns.addAdminSwitchListener(this.switchMode);
            if (!save && !defaultMode) {
                if (chayns.env.user.adminMode) {
                    globalState.activeModeId = 1;
                    this.state.activeModeId = 1;
                } else {
                    globalState.activeModeId = 0;
                    this.state.activeModeId = 0;
                }
            }
            if (save) {
                const storage = window.chayns.storage.get('react__modeSwitch--currentMode')
                    .then(() => {
                        if (storage.object) {
                            globalState.activeModeId = storage.object;
                            this.setState({ activeModeId: storage.object });
                            this.onChange(storage.object);
                        } else {
                            const { activeModeId } = this.state;
                            this.onChange(activeModeId);
                        }
                    });
            } else {
                const { activeModeId } = this.state;
                this.onChange(activeModeId);
            }
        } else {
            this.setState({
                modes: [],
                activeModeId: null,
                open: false
            });
        }
    }

    switchMode(id) {
        if (id.mode !== undefined) {
            this.setMode(id.mode);
            this.onChange(id.mode);
        } else {
            if (id === 0) {
                chayns.deactivateAdminMode();
            } else if (id === 1) {
                chayns.activateAdminMode();
            } else {
                this.onChange(id);
            }
            this.setState({ open: false });
            this.setMode(id);
        }
    }

    isUserInGroup(uacIds) {
        return !!window.chayns.env.user.groups.find(group => uacIds.indexOf(group.id) >= 0);
    }

    toggleModeSwitch() {
        const { open } = this.state;
        this.setState({ open: !open });
    }

    render() {
        const { show } = this.props;
        if (show && this.state && chayns.env.user.isAuthenticated) {
            const { modes, open, activeModeId } = this.state;
            return (
                <div className={classNames('cc__modeswitch', { 'cc__modeswitch--open': open })}>
                    <div className="cc__modeswitch__content">
                        <h2>Diese Seite verwenden als:</h2>
                        {
                            modes.map(mode => (
                                <div key={mode.id} className="grid__item col-1-2-desktop col-1-1-mobile">
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
                    >
                        <Icon icon={faCog}/>
                    </div>
                </div>
            );
        }
        return null;
    }
}
