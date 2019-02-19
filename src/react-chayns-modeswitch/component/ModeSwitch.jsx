/* eslint-disable jsx-a11y/click-events-have-key-events,class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';
import Icon from '../../react-chayns-icon/component/Icon';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

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

    static modes = [];

    static activeModeId = 0;

    static open = false;

    static onChangeListener = [];

    static getCurrentMode() {
        const { modes, activeModeId } = ModeSwitch;
        return modes.find(mode => mode.id === activeModeId || null);
    }

    static addChangeListener(callback) {
        ModeSwitch.onChangeListener.push(callback);
        if (ModeSwitch.modes.length > 0) {
            const mode = ModeSwitch.modes.find(m => m.id === ModeSwitch.activeModeId);
            callback(mode);
        }
    }

    static removeChangeListener(callback) {
        ModeSwitch.onChangeListener.splice(ModeSwitch.onChangeListener.indexOf(callback), 1);
    }

    constructor(props) {
        super(props);

        this.toggleModeSwitch = this.toggleModeSwitch.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.init = this.init.bind(this);
        this.state = {
            modes: [],
            activeModeId: null,
            open: false
        };

        window.chayns.ready.then(() => {
            window.chayns.addAccessTokenChangeListener(this.init);
            this.init();
        });
    }

    componentWillReceiveProps(nextProps) {
        const { modes } = this.props;
        if (chayns.env.user.isAuthenticated && nextProps.modes !== modes) {
            ModeSwitch.modes = this.setModes(nextProps.modes);
            this.setState({ modes: ModeSwitch.modes });
        }
    }

    onChange(id) {
        const { modes } = this.state;
        const { onChange } = this.props;
        const mode = modes.find(m => m.id === id);
        if (onChange) {
            onChange(mode);
        }
        ModeSwitch.onChangeListener.forEach((listener) => {
            listener(mode);
        });
    }

    setMode(id) {
        const { save } = this.props;
        this.setState({ activeModeId: id });
        ModeSwitch.activeModeId = id;
        if (save) {
            window.chayns.utils.ls.set('react__modeSwitch--currentMode', id);
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

    async init() {
        const { defaultMode, save, modes } = this.props;
        if (chayns.env.user.isAuthenticated) {
            ModeSwitch.modes = this.setModes(modes);
            ModeSwitch.activeModeId = defaultMode || 0;
            ModeSwitch.open = false;

            chayns.removeAdminSwitchListener(this.switchMode);
            chayns.addAdminSwitchListener(this.switchMode);
            if (defaultMode) {
                ModeSwitch.activeModeId = defaultMode;
            }
            if (save) {
                const storage = window.chayns.utils.ls.get('react__modeSwitch--currentMode');
                if (chayns.utils.isNumber(storage.object)) {
                    ModeSwitch.activeModeId = storage.object;
                }
            }
            if (ModeSwitch.activeModeId === 0 || ModeSwitch.activeModeId === 1) {
                ModeSwitch.activeModeId = chayns.env.user.adminMode ? 1 : 0;
            }
        } else {
            ModeSwitch.modes = [];
            ModeSwitch.activeModeId = null;
            ModeSwitch.open = false;
        }

        this.setState({
            modes: ModeSwitch.modes,
            activeModeId: ModeSwitch.activeModeId,
            open: ModeSwitch.open,
        });
        this.onChange(ModeSwitch.activeModeId);
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
                <TappPortal>
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
                            <Icon icon="ts-cog"/>
                        </div>
                    </div>
                </TappPortal>
            );
        }
        return null;
    }
}
