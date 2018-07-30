import '../../polyfills/array-find';

const callbacks = [];
let currentMode = null;
let initialized = false;
let managerItem = null;
let userItem = null;

function callCallbacks(data) {
    callbacks.map((callback) => {
        if (callback && window.chayns.utils.isFunction(callback)) {
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

    if (group.uacId && window.chayns.utils.isNumber(group.uacId)) {
        retval.push(group.uacId);
    }

    if (group.uacIds && window.chayns.utils.isArray(group.uacIds)) {
        retval = retval.concat(group.uacIds);
    }

    return retval;
}

function getAllowedUacIdsFromArray(uacArray) {
    const userGroups = window.chayns.env.user.groups;

    const allowedUacIds = [];

    for (let i = 0, x = userGroups.length; i < x; i += 1) {
        if (uacArray.indexOf(userGroups[i].id) !== -1) {
            allowedUacIds.push(userGroups[i].id);
        }
    }

    return allowedUacIds;
}

function convertToGroupObject(element) {
    if (window.chayns.utils.isObject(element)) {
        return element;
    }

    return {
        id: element,
        uacIds: [element]
    };
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

function hasAdminSwitch() {
    return !chayns.env.isApp;
}

function getPermittedGroupObject(id, name, uacIds) {
    if (!uacIds || uacIds.length === 0 || (uacIds.length === 1 && uacIds[0] === 0)) {
        return getGroupObject(id, name, [0]);
    }

    if (hasAdminSwitch() && managerItem && id === managerItem.id) {
        return null;
    }

    const allowedUacIds = getAllowedUacIdsFromArray(uacIds);

    if (allowedUacIds.length === 0) {
        return null;
    }

    return getGroupObject(id, name, allowedUacIds);
}

function getPreferredMode(options) {
    let savedModeId = null;

    if (options.save) {
        savedModeId = getSavedMode();
    }

    if (savedModeId === null && options.defaultMode) {
        savedModeId = options.defaultMode;
    }

    return savedModeId;
}

export default class ModeSwitchHelper {
    static init(options) {
        userItem = null;
        managerItem = null;

        if (options.groups) {
            if (window.chayns.utils.isFunction(options.onChange)) {
                callbacks.push(options.onChange);
            }

            if (options.save) {
                callbacks.push(setSavedMode);
            }

            const allowedGroups = [];
            let savedModeId = getPreferredMode(options);
            let isChaynsIdAdmin = false;

            const groups = [];
            if (options.groups) {
                options.groups.map((element) => {
                    const group = convertToGroupObject(element);

                    groups.push(group);
                });
            }

            if (window.chayns.env.user.isAuthenticated) {
                userItem = getGroupObject(0, window.chayns.env.user.name, [0]);

                const managerGroup = ModeSwitchHelper.findManagerGroup(groups);
                if (managerGroup) {
                    const { id, name, uacIds } = managerGroup;

                    managerItem = getGroupObject(id, name, uacIds);
                }
            }

            chayns.ready.then((data) => {
                if (window.chayns.env.user.isAuthenticated) {
                    // Condition if adminMode ChaynsId
                    let groupObject;

                    if (managerItem && data && data.AppUser.AdminMode && hasAdminSwitch()) {
                        groupObject = managerItem;
                        isChaynsIdAdmin = true;
                    } else {
                        groupObject = userItem;
                        groupObject.default = true;
                    }

                    allowedGroups.push(groupObject);


                    let changeGroupIndex = 0;
                    let changeGroup = false;
                    let changeGroupValue = null;

                    for (let i = 0, x = groups.length; i < x; i += 1) {
                        const uacIds = getUacIds(groups[i]);
                        const addGroupObject = getPermittedGroupObject(groups[i].id, groups[i].name, uacIds);

                        if (addGroupObject) {
                            allowedGroups.push(addGroupObject);

                            if (addGroupObject.id === savedModeId) {
                                changeGroup = true;
                                changeGroupIndex = allowedGroups.length - 1;
                                changeGroupValue = addGroupObject;
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
                            setDefaultGroup(isChaynsIdAdmin && managerItem ? managerItem.id : 0);
                        }

                        //  if (changeGroup) { window.setTimeout(() => { window.chayns.ui.modeSwitch.changeMode(changeGroupIndex); }, 0); }
                    } else {
                        setDefaultGroup(isChaynsIdAdmin && managerItem ? managerItem.id : 0);

                        // ToDo: Implement adminSwitchCallback for allowedGroups.length > 1 too
                        const changeListener = getChangeListener();
                        chayns.setAdminSwitchCallback(({ mode }) => changeListener({
                            id: mode,
                        }));
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
        if (currentMode) return currentMode;

        return getDefaultMode();
    }

    static onChange(callback) {
        if (window.chayns.utils.isFunction(callback)) {
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
        if (!window.chayns.env.user.isAuthenticated) return false;

        return !!window.chayns.env.user.groups.find((element) => {
            return element.id === uacId;
        });
    }

    static findManagerGroup(groups) {
        if (!window.chayns.env.user.isAuthenticated) return false;

        return groups.find((uac) => {
            return uac.uacIds && uac.uacIds.length === 1 && uac.uacIds[0] === 1;
        }) || groups.find((uac) => {
            return uac.uacIds && uac.uacIds.find(id => id === 1);
        });
    }

    static isChaynsManager() {
        return this.isUserInGroup(1);
    }
}
