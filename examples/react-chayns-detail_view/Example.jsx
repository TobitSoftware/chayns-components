/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/alt-text */
import React from 'react';

import ExampleContainer from '../ExampleContainer';
import DetailView from '../../src/react-chayns-detail_view/component/DetailView';
import DetailViewItem from '../../src/react-chayns-detail_view/component/DetailViewItem';
import DetailViewFooter from '../../src/react-chayns-detail_view/component/DetailViewFooter';
import DetailViewHeader from '../../src/react-chayns-detail_view/component/DetailViewHeader';

import '../../src/react-chayns-detail_view/index.scss';
import DetailViewGroup from '../../src/react-chayns-detail_view/component/DetailViewGroup';

export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        this.onOpen = this.onOpen.bind(this);
    }

    onOpen() {
        this.setState({
            open: !this.state.open,
        });
    }

    render() {
        return(
            <ExampleContainer headline="DetailView">
                <DetailView>
                    <DetailViewGroup>
                        <DetailViewHeader
                            expanded={this.state.open}
                        >
                            <img
                                src="https://tsimg.space/v1/images/0e723eb5-88c4-e711-8381-00155d099e09.jpg"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                onClick={this.onOpen}
                            />
                        </DetailViewHeader>
                        <DetailViewItem>
                            <h2>Lorem ipsum</h2>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            <br />
                            <input type="checkbox" className="checkbox" name="check" id="check1" />
                            <label htmlFor="check1">Option 1</label>
                            <br />
                            <input type="checkbox" className="checkbox" name="check" id="check2" />
                            <label htmlFor="check2">Option 2</label>
                        </DetailViewItem>
                    </DetailViewGroup>
                    <DetailViewFooter>
                        Custom Footer
                    </DetailViewFooter>
                </DetailView>
            </ExampleContainer>
        );
    }
}
