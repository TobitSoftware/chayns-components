/* eslint-disable jsx-a11y/click-events-have-key-events,class-methods-use-this */
import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';
import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

export default class ModeSwitch extends Component {
    static getCurrentMode() {
        const { modes, activeModeId } = ModeSwitch;
        return modes.find((mode) => mode.id === activeModeId || null);
    }

    static addChangeListener(callback) {
        ModeSwitch.onChangeListener.push(callback);
        if (ModeSwitch.modes.length > 0) {
            const mode = ModeSwitch.modes.find(
                (m) => m.id === ModeSwitch.activeModeId
            );
            callback(mode);
        }
    }

    static removeChangeListener(callback) {
        ModeSwitch.onChangeListener.splice(
            ModeSwitch.onChangeListener.indexOf(callback),
            1
        );
    }

    constructor(props) {
        super(props);

        this.showModeSwitch = this.showModeSwitch.bind(this);
        this.toggleModeSwitch = this.toggleModeSwitch.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.init = this.init.bind(this);
        this.state = {
            modes: [],
            activeModeId: null,
            open: false,
        };
        ModeSwitch.adminSwitchStatus = chayns.env.user.adminMode ? 1 : 0;
        ModeSwitch.adminSwitchSupport =
            !(
                chayns.env.appVersion < 5691 &&
                chayns.env.isIOS &&
                chayns.env.isApp
            ) && !!chayns.env.user.groups.find((g) => g.id === 1);
        window.chayns.ready.then(() => {
            window.chayns.addAccessTokenChangeListener(this.init);
            this.init();
        });
    }

    componentDidUpdate(prevProps) {
        const { modes } = this.props;
        if (chayns.env.user.isAuthenticated && prevProps.modes !== modes) {
            ModeSwitch.modes = this.setModes(modes);
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ modes: ModeSwitch.modes });
        }
    }

    onChange(id) {
        const { modes } = this.state;
        const { onChange } = this.props;
        const mode = modes.find((m) => m && m.id === id);
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
        const user = newModes.filter((mode) => mode.id === 0);
        const admin = newModes.filter((mode) => mode.id === 1);
        if (admin.length === 0) {
            newModes.unshift({
                id: 1,
                name: 'chayns® Manager',
                uacIds: [1],
            });
        }
        if (user.length === 0) {
            newModes.unshift({
                id: 0,
                name: window.chayns.env.user.name,
            });
        }
        newModes = newModes.filter(
            (mode) => !mode.uacIds || this.isUserInGroup(mode.uacIds)
        );
        return newModes;
    }

    async init() {
        const { defaultMode, save, modes, parent } = this.props;

        this.pageYOffset = (
            parent ||
            document.getElementsByClassName('tapp')[0] ||
            document.body
        ).getBoundingClientRect().top;
        if (chayns.env.user.isAuthenticated) {
            ModeSwitch.modes = this.setModes(modes);
            ModeSwitch.activeModeId = defaultMode || 0;
            ModeSwitch.open = false;
            ModeSwitch.adminSwitchStatus = chayns.env.user.adminMode ? 1 : 0;

            if (ModeSwitch.adminSwitchSupport && this.isUserInGroup([1])) {
                chayns.removeAdminSwitchListener(this.switchMode);
                chayns.addAdminSwitchListener(this.switchMode);
            }
            if (defaultMode) {
                ModeSwitch.activeModeId = defaultMode;
            }
            if (save) {
                const storage = window.chayns.utils.ls.get(
                    'react__modeSwitch--currentMode'
                );
                if (chayns.utils.isNumber(storage)) {
                    ModeSwitch.activeModeId = storage;
                }
            }
            if (
                ModeSwitch.adminSwitchSupport &&
                (ModeSwitch.activeModeId === 0 || ModeSwitch.activeModeId === 1)
            ) {
                ModeSwitch.activeModeId = ModeSwitch.adminSwitchStatus;
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
            ModeSwitch.adminSwitchStatus = id.mode;
            this.setMode(id.mode);
            this.onChange(id.mode);
        } else {
            if (id === 0 && ModeSwitch.adminSwitchSupport) {
                chayns.deactivateAdminMode();
                ModeSwitch.adminSwitchStatus = 0;
            } else if (id === 1 && ModeSwitch.adminSwitchSupport) {
                chayns.activateAdminMode();
                ModeSwitch.adminSwitchStatus = 1;
            } else {
                this.onChange(id);
            }
            this.setState({ open: false });
            this.setMode(id);
        }
    }

    isUserInGroup(uacIds) {
        return !!window.chayns.env.user.groups.find(
            (group) => uacIds.indexOf(group.id) >= 0
        );
    }

    toggleModeSwitch() {
        const { open } = this.state;
        this.setState({ open: !open });
    }

    showModeSwitch() {
        const { show } = this.props;
        const { modes } = this.state;

        let customModes = modes.length;
        if (modes.find((mode) => mode.uacIds && mode.uacIds.indexOf(1) >= 0)) {
            customModes -= 1;
        }
        if (
            modes.find(
                (mode) =>
                    !mode.uacIds || (mode.uacIds && mode.uacIds.indexOf(0) >= 0)
            )
        ) {
            customModes -= 1;
        }

        return (
            (show ||
                (show === null &&
                    modes.length > 1 &&
                    (!ModeSwitch.adminSwitchSupport ||
                        modes.length > 2 ||
                        customModes))) &&
            chayns.env.user.isAuthenticated
        );
    }

    render() {
        const { modes, open, activeModeId } = this.state;
        const { parent } = this.props;

        if (this.showModeSwitch()) {
            return (
                <TappPortal parent={parent}>
                    <div
                        className={classNames('cc__modeswitch', {
                            'cc__modeswitch--open': open,
                        })}
                        style={{ top: `${this.pageYOffset}px` }}
                    >
                        <div className="cc__modeswitch__content">
                            <h2>Diese Seite verwenden als:</h2>
                            {modes.map((mode) =>
                                !ModeSwitch.adminSwitchSupport ||
                                mode.id > 1 ||
                                mode.id === ModeSwitch.adminSwitchStatus ? (
                                    <div
                                        key={mode.id}
                                        className="grid__item col-1-2-desktop col-1-1-mobile"
                                    >
                                        <RadioButton
                                            name="modeSwitchRadioButtons"
                                            value={mode.id}
                                            onChange={this.switchMode}
                                            checked={mode.id === activeModeId}
                                        >
                                            {mode.name}
                                        </RadioButton>
                                    </div>
                                ) : null
                            )}
                        </div>
                        <div
                            className={classNames('cc__modeswitch__trigger', {
                                'cc__modeswitch__trigger--red':
                                    activeModeId > 1,
                            })}
                            onClick={this.toggleModeSwitch}
                        >
                            <Icon icon="ts-cog" />
                        </div>
                    </div>
                </TappPortal>
            );
        }
        return null;
    }
}

ModeSwitch.modes = [];

ModeSwitch.activeModeId = 0;

ModeSwitch.open = false;

ModeSwitch.onChangeListener = [];

ModeSwitch.adminSwitchSupport = false;

ModeSwitch.adminSwitchStatus = 0;

ModeSwitch.propTypes = {
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
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},
};

ModeSwitch.defaultProps = {
    modes: null,
    save: false,
    onChange: null,
    defaultMode: null,
    show: null,
    parent: null,
};

ModeSwitch.displayName = 'ModeSwitch';
