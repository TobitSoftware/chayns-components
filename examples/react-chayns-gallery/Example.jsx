import React from 'react';

import '../../src/react-chayns-gallery/index.scss';
import ExampleContainer from '../ExampleContainer';
import Gallery from '../../src/react-chayns-gallery/component/Gallery';


export default class Example extends React.Component {
    constructor() {
        super();
    }


    render() {
      const urls = ['https://tsimg.space/v1/images/f37122dd-2f1d-e811-8381-00155d099e09_mshortedgescale-s500.jpg', 'https://tsimg.space/v1/images/971ec821-6076-e811-80d6-0025905a8161_mshortedgescale-s500.jpg', 'https://tsimg.space/v1/images/e5327caf-3579-e811-80d6-0025905a8161_mshortedgescale-s500.jpg', 'https://tsimg.space/v1/images/3c85833e-2d2c-e811-8381-00155d099e09_mshortedgescale-s500.jpg', 'https://tsimg.space/v1/images/f55c0529-be72-e811-80d6-0025905a8161_mshortedgescale-s500.jpg', 'https://tsimg.space/v1/images/0b7ae926-5e6e-e811-80d6-0025905a8161_mshortedgescale-s500.jpg'];
      return(
            <ExampleContainer headline="Gallery">
                <div style={{height:'500px', width: '100%'}}>
                    <Gallery urls={urls} />
                </div>

                <div style={{marginTop: '30px'}}>
                    <Gallery urls={urls} height={100} width={100}/>
                </div>

                <div style={{marginTop: '30px', height:'256px', width: '50%'}}>
                    <Gallery urls={urls} onClick={console.log}/>
                </div>

                <div style={{marginTop: '30px', height:'200px', width: '50%'}}>
                    <Gallery urls={urls} onlyIcon/>
                </div>

                <div style={{marginTop: '30px', height:'70%', width: '50%'}}>
                    <Gallery urls={urls} onlyIcon height={100} width={100}/>
                </div>
            </ExampleContainer>
        );
    }
}
