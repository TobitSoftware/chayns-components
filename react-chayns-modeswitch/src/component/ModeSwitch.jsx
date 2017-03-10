import React from 'react';

import ModeSwitchHelper from './ModeSwitchHelper.js';

class ModeSwitch extends React.Component {

    static propTypes = {
        groups: React.PropTypes.arrayOf(
            React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.object])
        ),
        save: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };

    constructor() {
        super();
    }

    componentDidMount() {
        ModeSwitchHelper.init({
            groups: this.props.groups,
            save: this.props.save,
            onChange: this.props.onChange
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

ModeSwitch.propTypes = {
    onChange: React.PropTypes.func,
    groups: React.PropTypes.array,
    save: React.PropTypes.bool
};

export default ModeSwitch;