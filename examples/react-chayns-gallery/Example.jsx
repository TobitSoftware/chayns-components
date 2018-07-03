import React from 'react';

import '../../src/react-chayns-gallery/index.scss';
import ExampleContainer from '../ExampleContainer';
import Gallery from '../../src/react-chayns-gallery/component/Gallery';


export default class Example extends React.Component {
    constructor() {
        super();
    }


    render() {
      const urls = ['https://tsimg.space/v1/images/6ffbd340-a77b-e811-80d6-0025905a8161.jpg',
          'https://tsimg.space/v1/images/c9a8d7ad-ee72-e811-80d6-0025905a8161.jpg',
          'https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg',
          'https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg'];
      return(
            <ExampleContainer headline="Gallery">
                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0]]} />
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0], urls[1]]} />
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={[urls[0], urls[1], urls[3]]} />
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={urls} />
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery urls={urls} onlyIcon />
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Gallery
                        urls={urls}
                        onlyIcon
                        onClick={console.log}
                    />
                </div>
            </ExampleContainer>
        );
    }
}
