import React, { Component } from 'react';

import '../../src/react-chayns-gallery/index.scss';
import ExampleContainer from '../ExampleContainer';
import Gallery from '../../src/react-chayns-gallery/component/Gallery';
import Button from '../../src/react-chayns-button/component/Button';


export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            editableUrls: [
                'https://tsimg.cloud/72975-12914/e087202f5badd652fd015d39df83c35065941fe5.png',
                'https://tsimg.space/v1/images/6ffbd340-a77b-e811-80d6-0025905a8161.jpg',
                'https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg'
            ]
        };
    }

    render() {
        const { editableUrls } = this.state;
        const urls = [
            'https://tsimg.cloud/72975-12914/e087202f5badd652fd015d39df83c35065941fe5.png',
            'https://tsimg.space/v1/images/6ffbd340-a77b-e811-80d6-0025905a8161.jpg',
            'https://tsimg.space/v1/images/c9a8d7ad-ee72-e811-80d6-0025905a8161.jpg',
            'https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg',
            'https://tsimg.space/v1/images/6860fec5-ee72-e811-80d6-0025905a8161.jpg',
            'https://tsimg.space/v1/images/59a25b31-3997-e811-80d6-0025905a8161.jpg',
            'https://tsimg.space/v1/images/545a343f-57a4-e811-80d6-0025905a8161.jpg'
        ];
        return (
            <ExampleContainer headline="Gallery">
                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0]]} height={180} width={320}/>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0], urls[1]]}/>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0], urls[1], urls[2]]}/>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0], urls[1], urls[2], urls[3]]}/>
                </div>
                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0], urls[1], urls[2], urls[3], urls[4]]}/>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery
                        urls={urls}
                        onClick={console.log}
                    />
                </div>

                <Button onClick={() => {
                    chayns.uploadCloudImage().then((data) => {
                        editableUrls.push(data.url);
                        this.setState(editableUrls);
                    });
                }}
                >
                    Upload
                </Button>

                <div style={{ marginTop: '30px' }}>
                    <Gallery
                        urls={editableUrls}
                        deleteMode
                        onDelete={(url, index) => {
                            editableUrls.splice(index, 1);
                            this.setState({ editableUrls });
                        }}
                    />
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery
                        urls={urls}
                        deleteMode
                        onDelete={(url, index) => {
                            console.log('onDelete', url, index);
                        }}
                    />
                </div>
            </ExampleContainer>
        );
    }
}
