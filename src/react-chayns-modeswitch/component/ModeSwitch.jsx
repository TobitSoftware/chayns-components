import React from 'react';
import PropTypes from 'prop-types';

import ModeSwitchHelper from './ModeSwitchHelper.js';

class ModeSwitch extends React.Component {

    static propTypes = {
        groups: PropTypes.arrayOf(
            PropTypes.oneOf([PropTypes.number, PropTypes.object])
        ),
        save: PropTypes.bool,
        onChange: PropTypes.func,
        defaultMode: PropTypes.number
    };

    constructor() {
        super();
    }

    componentDidMount() {
        ModeSwitchHelper.init({
            groups: this.props.groups,
            save: this.props.save,
            onChange: this.props.onChange,
            defaultMode: this.props.defaultMode
        });
    }

    render() {
        return null;
    }

    static init = function(config) {
        if(!config) return false;

        ModeSwitchHelper.init(config);

        return true;
    };

    static isUserInGroup(groupId) {
        if(!window.chayns.env.user.isAuthenticated) return false;

        for (let j = 0, userGroups = window.chayns.env.user.groups, k = userGroups.length; j < k; j++) {
            if(groupId == userGroups[j].id) {
                return true;
            }
        }

        return false;
    }
}

ModeSwitch.getCurrentMode = ModeSwitchHelper.getCurrentMode;
ModeSwitch.addChangeListener = ModeSwitchHelper.onChange;
ModeSwitch.removeChangeListener = ModeSwitchHelper.unregisterOnChange;
ModeSwitch.show = ModeSwitchHelper.show;
ModeSwitch.hide = ModeSwitchHelper.hide;

export default ModeSwitch;