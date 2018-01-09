import '../../polyfills/array-find';

const callbacks = [];
let currentMode = null;
let initialized = false;

function callCallbacks(data) {
    callbacks.map((callback) => {
        if(callback && window.chayns.utils.isFunction(callback)) {
            callback(data);
        }
    });
}

function getChangeListener() {
    return (data) => {
        callCallbacks(data);

        currentMode = data;
    };
}

function setDefaultGroup(mode = 0) {
    initialized = true;

    getChangeListener()({
        id: mode
    });

    window.chayns.ui.modeSwitch.changeMode(0);
}

function getUacIds(group) {
    let retval = [];

    if(group.uacId && window.chayns.utils.isNumber(group.uacId)) {
        retval.push(group.uacId);
    }

    if(group.uacIds && window.chayns.utils.isArray(group.uacIds)) {
        retval = retval.concat(group.uacIds);
    }

    return retval;
}

function getAllowedUacIdsFromArray(uacArray) {
    const userGroups = window.chayns.env.user.groups;

    const allowedUacIds = [];

    for (let i = 0, x = userGroups.length; i < x; i += 1) {
        if(uacArray.indexOf(userGroups[i].id) !== -1) {
            allowedUacIds.push(userGroups[i].id);
        }
    }

    return allowedUacIds;
}

function getGroupObject(id, name, uacs) {
    return {
        id,
        uacIds: uacs,
        name
    };
}

function getSavedMode() {
    return window.chayns.utils.ls.get('react__modeSwitch--currentMode');
}

function setSavedMode(mode) {
    return window.chayns.utils.ls.set('react__modeSwitch--currentMode', mode.id);
}

function getDefaultMode() {
    const name = (window.chayns.env.user.isAuthenticated) ? window.chayns.env.user.name : '';

    return getGroupObject(0, name, null);
}

export default class ModeSwitchHelper {
    static init(options) {
        if(options.groups) {
            if(window.chayns.utils.isFunction(options.onChange)) {
                callbacks.push(options.onChange);
            }

            if(options.save) {
                callbacks.push(setSavedMode);
            }

            const allowedGroups = [];
            let isChaynsIdAdmin = false;

            const groups = [];
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

            chayns.ready.then((data) => {
                if (window.chayns.env.user.isAuthenticated) {
                    // Condition if adminMode ChaynsId
                    let groupObject;

                    const managerGroup = this.findManagerGroup(groups);

                    if(managerGroup && data && data.AppUser.AdminMode) {
                        groupObject = getGroupObject(managerGroup.id, managerGroup.name, managerGroup.uacIds);
                        isChaynsIdAdmin = true;
                    } else {
                        groupObject = getGroupObject(0, window.chayns.env.user.name, [0]);
                    }
                    groupObject.default = true;
                    allowedGroups.push(groupObject);


                    let savedModeId = null;
                    let changeGroupIndex = 0;
                    if(options.save) {
                        savedModeId = getSavedMode();
                    }

                    if(savedModeId === null && options.defaultMode) {
                        savedModeId = options.defaultMode;
                    }

                    let changeGroup = false;
                    let changeGroupValue = null;

                    for (let i = 0, x = groups.length; i < x; i += 1) {
                        if (!groups[i].uacId && !groups[i].uacIds) {
                            const addGroupObject = getGroupObject(groups[i].id, groups[i].name, [0]);
                            allowedGroups.push(addGroupObject);

                            if (addGroupObject.id === savedModeId) {
                                changeGroup = true;
                                changeGroupIndex = allowedGroups.length - 1;
                                changeGroupValue = addGroupObject;
                            }
                        } else {
                            const uacIds = getUacIds(groups[i]);
                            const allowedUacs = getAllowedUacIdsFromArray(uacIds);

                            if (allowedUacs.length > 0 && !(allowedUacs.find(uac => uac === 1))) {
                                const addGroupObject = getGroupObject(groups[i].id, groups[i].name, allowedUacs);
                                allowedGroups.push(addGroupObject);

                                if (addGroupObject.id === savedModeId) {
                                    changeGroup = true;
                                    changeGroupIndex = allowedGroups.length - 1;
                                    changeGroupValue = addGroupObject;
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
                            setDefaultGroup(isChaynsIdAdmin && managerGroup ? managerGroup.id : 0);
                        }

                        //  if (changeGroup) { window.setTimeout(() => { window.chayns.ui.modeSwitch.changeMode(changeGroupIndex); }, 0); }
                    } else {
                        setDefaultGroup(isChaynsIdAdmin && managerGroup ? managerGroup.id : 0);
                    }
                } else {
                    setDefaultGroup();
                }
            });
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
        const index = callbacks.indexOf(callback);

        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    static isInitialized() {
        return initialized;
    }

    static hide() {
        window.chayns.ui.modeSwitch.remove();
    }

    static show() {
        window.chayns.ui.modeSwitch.add();
    }

    static isUserInGroup(uacId) {
        if(!window.chayns.env.user.isAuthenticated) return false;

        return !!window.chayns.env.user.groups.find((element) => {
            return element.id === uacId;
        });
    }

    static findManagerGroup(groups) {
        if(!window.chayns.env.user.isAuthenticated) return false;

        return groups.find((uac) => {
            return uac.uacIds.length === 1 && uac.uacIds[0] === 1;
        }) || groups.find((uac) => {
            return uac.uacIds && uac.uacIds.find(id => id === 1);
        });
    }

    static isChaynsManager() {
        return this.isUserInGroup(1);
    }
}
