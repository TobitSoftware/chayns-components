let callbacks = [];
let currentMode = null;
let initialized = false;

export default class ModeSwitchHelper {
    static init(options) {
        if(options.groups) {

            if( window.chayns.utils.isFunction(options.onChange) ) {
                callbacks.push(options.onChange);
            }

            if(options.save) {
                callbacks.push(setSavedMode);
            }

            let allowedGroups = [];

            let groups = [];
            if (options.groups) {
                options.groups.map((element) => {
                    if (window.chayns.utils.isObject(element)) {
                        groups.push(element);
                    } else {
                        groups.push({
                            id: element,
                            uacId: element
                        });
                    }
                });
            }

            if (window.chayns.env.user.isAuthenticated) {

                let groupObject = getGroupObject(0, window.chayns.env.user.name, [0]);
                groupObject.default = true;
                allowedGroups.push(groupObject);


                let savedModeId = null, changeGroupIndex = 0;
                if (options.save) {
                    savedModeId = getSavedMode();
                }

                if(savedModeId === null && options.defaultMode) {
                    savedModeId = options.defaultMode;
                }

                let changeGroup = false;
                let changeGroupValue = null;

                for (let i = 0, x = groups.length; i < x; i++) {
                    if (!groups[i].uacId && !groups[i].uacIds) {
                        let groupObject = getGroupObject(groups[i].id, groups[i].name, [0]);
                        allowedGroups.push(groupObject);
                    } else {
                        let uacIds = getUacIds(groups[i]);
                        let allowedUacs = getAllowedUacIdsFromArray(uacIds);

                        if (allowedUacs.length > 0) {

                            let groupObject = getGroupObject(groups[i].id, groups[i].name, allowedUacs);
                            allowedGroups.push(groupObject);


                            if (groupObject.id == savedModeId) {
                                changeGroup = true;
                                changeGroupIndex = allowedGroups.length - 1;
                                changeGroupValue = groupObject;
                            }
                        }
                    }
                }

                if (allowedGroups.length > 1) {

                    window.chayns.ui.modeSwitch.init({
                        items: allowedGroups,
                        callback: getChangeListener()
                    });


                    initialized = true;


                    if (changeGroup) {
                        getChangeListener()(changeGroupValue);

                        window.chayns.ui.modeSwitch.changeMode(changeGroupIndex);
                    } else {
                        setDefaultGroup();
                    }


                    if (changeGroup)
                    window.setTimeout(() => {
                        window.chayns.ui.modeSwitch.changeMode(changeGroupIndex);
                    }, 0);
                } else {
                    setDefaultGroup();
                }
            } else {
                setDefaultGroup();
            }
        } else {
            console.warn('No groups specified');
        }
    }

    static getCurrentMode() {
        if(currentMode) return currentMode;

        return getDefaultMode();
    }

    static onChange(callback) {
        if(window.chayns.utils.isFunction(callback)) {
            callbacks.push(callback);

            return true;
        }

        return false;
    }

    static unregisterOnChange(callback) {
        let index = callbacks.indexOf(callback);

        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    static isInitialized() {
        return initialized;
    }
}

function getChangeListener() {
    return function(data) {
        callCallbacks(data);

        currentMode = data;
    }
}

function setDefaultGroup() {
    initialized = true;

    getChangeListener()({
        id: 0
    });

    window.chayns.ui.modeSwitch.changeMode(0);
}

function callCallbacks(data) {
    callbacks.map((callback) => {
        if(callback && window.chayns.utils.isFunction(callback)) {
            callback(data);
        }
    });
}

function getUacIds(group) {
    let retval = [];

    if(group.uacId && window.chayns.utils.isNumber( group.uacId )) {
        retval.push(group.uacId);
    }

    if(group.uacIds && window.chayns.utils.isArray( group.uacIds )) {
        retval = retval.concat(group.uacIds);
    }

    return retval;
}

function getAllowedUacIdsFromArray(uacArray) {
    let userGroups = window.chayns.env.user.groups;

    let allowedUacIds = [];

    for (let i = 0, x = userGroups.length; i < x; i++) {
        if(uacArray.indexOf(userGroups[i].id) !== -1) {
            allowedUacIds.push(userGroups[i].id)
        }
    }

    return allowedUacIds;
}

function getGroupObject(id, name, uacs) {
    return {
        id: id,
        uacIds: uacs,
        name: name
    };
}

function getSavedMode() {
    return window.chayns.utils.ls.get('react__modeSwitch--currentMode');
}

function setSavedMode(mode) {
    return window.chayns.utils.ls.set('react__modeSwitch--currentMode', mode.id);
}

function getDefaultMode() {
    let name = (window.chayns.env.user.isAuthenticated) ? window.chayns.env.user.name : '';

    return getGroupObject(0, name, null);
}