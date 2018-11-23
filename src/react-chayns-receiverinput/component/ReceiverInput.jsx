import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { getMemberCount } from 'tobit-intercom-helper';

import ReceiverSearchPopup from './content/ReceiverSearchPopup';
import ChosenMember from './content/ChosenMember';

export default class ReceiverInput extends Component {
    static propTypes = {
        onChosenReceiverChange: PropTypes.func,
        preselectedReceivers: PropTypes.array,
        maxReceiverCount: PropTypes.number,
        onGroupNameChange: PropTypes.func,
        groupNameEnabled: PropTypes.bool,
        addPageOffset: PropTypes.bool,
        placeholder: PropTypes.string,
        locationMode: PropTypes.bool,
        fontFamily: PropTypes.string,
        onlyPersons: PropTypes.bool,
        canFindOwn: PropTypes.bool,
        fontSize: PropTypes.string,
        onlySites: PropTypes.bool,
        disabled: PropTypes.bool,
        pureMode: PropTypes.bool,
        includeIntercomDisabled: PropTypes.bool,
        showIdInPopup: PropTypes.bool,
        showIdInSelection: PropTypes.bool
    };

    static defaultProps = {
        onChosenReceiverChange: null,
        preselectedReceivers: null,
        maxReceiverCount: null,
        onGroupNameChange: null,
        groupNameEnabled: false,
        addPageOffset: false,
        placeholder: '',
        fontFamily: null,
        onlyPersons: false,
        canFindOwn: false,
        locationMode: false,
        fontSize: null,
        onlySites: false,
        disabled: false,
        pureMode: false,
        includeIntercomDisabled: false,
        showIdInPopup: false,
        showIdInSelection: false
    };

    defaultState = {
        foundReceivers: {
            locations: {
                state: 3,
                values: []
            },
            users: {
                state: 3,
                values: []
            },
            groups: {
                state: 3,
                values: []
            }
        },
        popupPosition: { top: 0, left: 0 },
        receiverSearchString: '',
        chosenReceivers: [],
        chosenSender: null,
        showPopup: false,
        groupName: '',
        popupWidth: 0
    };

    constructor(props) {
        super(props);

        this.lastResultDisplayedTime = 0;

        const { preselectedReceivers } = this.props;

        const firstState = this.defaultState;

        if (Array.isArray(preselectedReceivers) && preselectedReceivers.length > 0) {
            firstState.chosenReceivers = preselectedReceivers;
        }

        this.state = this.defaultState;

        this.addPopupRootDiv();
    }

    componentDidMount() {
        const { chosenReceivers, groupName } = this.state;

        document.addEventListener('click', this.handleClick, true);

        window.getChosenReceivers = () => (chosenReceivers || []);

        window.getGroupName = () => (groupName || '');

        window.clearReceiverInput = () => {
            this.setState(this.defaultState);
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {
            maxReceiverCount,
            groupNameEnabled,
            canFindOwn,
            addPageOffset,
            placeholder,
            fontFamily,
            onlyPersons,
            onlySites,
            locationMode,
            fontSize,
            disabled,
            pureMode,
            includeIntercomDisabled,
            showIdInPopup,
            showIdInSelection
        } = this.props;

        const {
            chosenReceivers,
            foundReceivers,
            popupPosition,
            receiverSearchString,
            chosenSender,
            showPopup,
            groupName,
            popupWidth
        } = this.state;

        return receiverSearchString !== nextState.receiverSearchString
            || !isEqual(chosenReceivers, nextState.chosenReceivers)
            || !isEqual(foundReceivers, nextState.foundReceivers)
            || !isEqual(popupPosition, nextState.popupPosition)
            || groupNameEnabled !== nextProps.groupNameEnabled
            || maxReceiverCount !== nextProps.maxReceiverCount
            || !isEqual(chosenSender, nextState.chosenSender)
            || addPageOffset !== nextProps.addPageOffset
            || locationMode !== nextProps.locationMode
            || placeholder !== nextProps.placeholder
            || onlyPersons !== nextProps.onlyPersons
            || onlySites !== nextProps.onlySites
            || canFindOwn !== nextProps.canFindOwn
            || popupWidth !== nextState.popupWidth
            || fontFamily !== nextProps.fontFamily
            || showPopup !== nextState.showPopup
            || groupName !== nextState.groupName
            || fontSize !== nextProps.fontSize
            || disabled !== nextProps.disabled
            || pureMode !== nextProps.pureMode
            || includeIntercomDisabled !== nextProps.includeIntercomDisabled
            || showIdInPopup !== nextProps.showIdInPopup
            || showIdInSelection !== nextProps.showIdInSelection;
    }

    componentDidUpdate() {
        this.addReceiverPopupToDiv();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    addPopupRootDiv = () => {
        const { fontSize, fontFamily } = this.props;

        const givenPopupRootDiv = document.getElementById('receiverPopupRoot');

        if (!givenPopupRootDiv) {
            const popupRootDiv = document.createElement('div');

            popupRootDiv.id = 'receiverPopupRoot';

            if (fontSize) {
                popupRootDiv.style.fontSize = fontSize;
            }

            if (fontFamily) {
                popupRootDiv.style.fontFamily = fontFamily;
            }

            document.body.appendChild(popupRootDiv);
        }
    };

    addReceiverPopupToDiv = () => {
        const {
            locationMode,
            onlyPersons,
            onlySites,
            showIdInPopup
        } = this.props;

        const {
            chosenReceivers,
            showPopup,
            popupPosition,
            popupWidth,
            foundReceivers
        } = this.state;

        ReactDOM.render(
            <ReceiverSearchPopup
                updateReceiverSearchString={this.updateReceiverSearchString}
                updateChosenReceivers={this.updateChosenReceivers}
                chosenReceivers={chosenReceivers}
                foundReceivers={foundReceivers}
                onlyPersons={onlyPersons}
                isLocation={locationMode}
                position={popupPosition}
                onlySites={onlySites}
                width={popupWidth}
                show={showPopup}
                showIdInPopup={showIdInPopup}
            />,
            document.getElementById('receiverPopupRoot')
        );
    };

    searchForReceivers = (event) => {
        const searchString = event.target.value;

        this.updateReceiverSearchString(searchString);

        if (searchString.trim() !== '') {
            this.searchReceiversForString(searchString);
        }

        if (searchString.trim() !== '') {
            this.showReceiverPopup(event);
        }
    };

    removeReceiver = (receiverType, id) => {
        const { chosenReceivers } = this.state;

        switch (receiverType) {
            case 0:
                this.updateChosenReceivers(chosenReceivers.filter(r => r.locationId !== id));
                break;
            case 1:
                this.updateChosenReceivers(chosenReceivers.filter(r => r.userId !== id));
                break;
            case 2:
                this.updateChosenReceivers(chosenReceivers.filter(r => r.groupId !== id));
                break;
            default:
                break;
        }
    };

    updateChosenReceivers = (chosenReceivers) => {
        const { onChosenReceiverChange } = this.props;

        if (onChosenReceiverChange) {
            onChosenReceiverChange(chosenReceivers);
        }

        this.setState({ chosenReceivers });
    };

    changeGroupName = (event) => {
        const { onGroupNameChange } = this.props;

        const groupName = event.target.value;

        if (onGroupNameChange) {
            onGroupNameChange(groupName);
        }

        this.setState({ groupName });
    };

    showReceiverPopup = async (event) => {
        const { addPageOffset } = this.props;

        const target = event.target.parentNode.parentNode;

        const inputOffsets = target.getBoundingClientRect();

        let pageOffset = 0;

        if (addPageOffset) {
            if (chayns.env.isApp) {
                pageOffset = window.pageYOffset;
            } else {
                pageOffset = (await chayns.getWindowMetrics()).pageYOffset;
            }
        }

        const top = inputOffsets.top + inputOffsets.height + pageOffset;
        const { width, left } = inputOffsets;

        this.setState({
            popupPosition: { top, left },
            popupWidth: width,
            showPopup: true
        });
    };

    hideReceiverPopup = () => this.setState({
        popupPosition: { top: 0, left: 0 },
        showPopup: false,
        popupWidth: 0
    });

    handleClick = (event) => {
        const { target } = event;

        if (target) {
            if (!target.classList.contains('popup-item') && !target.classList.contains('receiver-popup') && !target.classList.contains('receiver-input-field')) {
                this.hideReceiverPopup();
            }
        } else {
            this.hideReceiverPopup();
        }
    };

    updateReceiverSearchString = (receiverSearchString) => {
        if (receiverSearchString.trim() === '') {
            this.hideReceiverPopup();

            this.setState({
                foundReceivers: { locations: { state: 3, values: [] }, users: { state: 3, values: [] }, groups: { state: 3, values: [] } }
            });
        }

        this.setState({ receiverSearchString });
    };

    // eslint-disable-next-line react/sort-comp
    searchReceiversForString = throttle((searchString) => {
        const {
            canFindOwn,
            locationMode,
            onlyPersons,
            onlySites,
            includeIntercomDisabled
        } = this.props;

        const { chosenSender } = this.state;

        const userId = chayns.env.user.id;
        const locationId = chosenSender ? chosenSender.locationId : chayns.env.site.locationId;

        const url = `//chayns1.tobit.com/TappApi/Global/Search?SearchString=${searchString}&LocationId=${locationId}&userId=${userId}&includeIntercomDisabled=${includeIntercomDisabled}`;

        const requestStartTime = Date.now();

        fetch(encodeURI(url), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `bearer ${chayns.env.user.tobitAccessToken}`
            }
        })
            .then(response => response.json())
            .then((result) => {
                // stop if request data is older than current data
                if (this.lastResultDisplayedTime > requestStartTime) {
                    return null;
                }

                this.lastResultDisplayedTime = requestStartTime;

                const locationsResult = {
                    state: result.locations.Status.ResultCode,
                    values: []
                };

                const usersResult = {
                    state: result.users.Status.ResultCode,
                    values: []
                };

                const groupsResult = {
                    state: result.groups.Status.ResultCode,
                    values: []
                };

                if (locationsResult.state === 0 && !onlyPersons) {
                    if (chosenSender) {
                        locationsResult.values = result.locations.Value
                            .filter(l => (chosenSender && !canFindOwn ? l.locationID !== parseInt(chosenSender.locationId, 10) : true));
                    } else {
                        locationsResult.values = result.locations.Value
                            .filter(l => (locationMode && !canFindOwn ? l.locationID !== parseInt(chayns.env.site.locationId, 10) : true));
                    }

                    if (locationsResult.values.length < 1) {
                        locationsResult.state = 1; // set state to "no match" if only own location was found
                    }
                }

                if (usersResult.state === 0 && !onlySites) {
                    usersResult.values = result.users.Value
                        .filter(u => (locationMode || canFindOwn ? true : u.userId !== chayns.env.user.id));

                    if (usersResult.values.length < 1) {
                        usersResult.state = 1; // set state to "no match" if only own user was found
                    }
                }

                if (locationMode) {
                    if (groupsResult.state === 0) {
                        groupsResult.values = result.groups.Value;
                    }

                    const knownPersonsString = 'Bekannte Personen';

                    if (knownPersonsString.toLowerCase().indexOf(searchString.toLowerCase()) > -1 && (groupsResult.state < 2 || searchString.toLowerCase() === knownPersonsString.toLowerCase())) {
                        const knownPersonsGroup = {
                            groupId: 0,
                            userIds: [],
                            name: knownPersonsString,
                            showName: knownPersonsString
                        };

                        groupsResult.values.unshift(knownPersonsGroup);
                        groupsResult.state = 0;
                    }
                }

                const foundReceivers = {
                    locations: locationsResult,
                    groups: groupsResult,
                    users: usersResult
                };

                this.setState({ foundReceivers });

                return null;
            })
            .catch(error => console.error(error));
    }, 250, { leading: false });

    render() {
        const {
            groupNameEnabled,
            maxReceiverCount,
            placeholder,
            disabled,
            pureMode,
            showIdInSelection
        } = this.props;

        const { chosenReceivers, groupName, receiverSearchString } = this.state;

        const isDarkMode = chayns.env.site.colorMode === 1;

        const knownPersonsSelected = chosenReceivers
            .filter(cr => cr.groupId === 0)
            .length > 0;

        const memberCount = getMemberCount(chosenReceivers);
        const moreThanOneReceiverChosen = memberCount > 1 || knownPersonsSelected;
        const maxReceiverCountGiven = maxReceiverCount && memberCount >= maxReceiverCount;

        const groupNameInputClasses = classNames('group-name-input', {
            hide: !moreThanOneReceiverChosen || !groupNameEnabled
        });

        const receiverInputClasses = classNames('receiver-input chayns__border-color--40', {
            'receiver-input--dark': isDarkMode,
            'receiver-input--pure': pureMode
        });

        const inputBoxClasses = classNames('input-box', {
            'input-box--hide': maxReceiverCountGiven
        });

        const receivers = [];

        chosenReceivers.forEach((r) => {
            receivers.push(<ChosenMember
                removeMember={this.removeReceiver}
                locationId={r.locationId}
                groupId={r.groupId}
                userId={r.userId}
                personId={showIdInSelection && r.personId ? r.personId : null}
                siteId={showIdInSelection && r.siteId ? r.siteId : null}
                name={r.name}
                key={`key_${r.locationId || r.groupId || r.userId}`}
            />);
        });

        return (
            <div className="receiver-input-box">
                <div className={receiverInputClasses}>
                    {receivers}
                    <div className={inputBoxClasses}>
                        <input
                            disabled={disabled || maxReceiverCountGiven}
                            className="input receiver-input-field"
                            onChange={this.searchForReceivers}
                            onFocus={this.showReceiverPopup}
                            value={receiverSearchString}
                            placeholder={placeholder}
                            type="text"
                        />
                    </div>
                </div>
                <div className={groupNameInputClasses}>
                    <input
                        disabled={disabled || !groupNameEnabled || !moreThanOneReceiverChosen}
                        placeholder="Gruppenname (optional)"
                        onChange={this.changeGroupName}
                        value={groupName}
                        className="input"
                        type="text"
                    />
                </div>
            </div>
        );
    }
}
