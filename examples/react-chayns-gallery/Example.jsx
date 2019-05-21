import React, { PureComponent } from 'react';

import Gallery from '../../src/react-chayns-gallery/component/Gallery';
import Image from '../../src/react-chayns-gallery/component/Image';

export default class GalleryExample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                {
                    url: 'https://tsimg.cloud/127-89061/9d6979d3ac95a053c532f86af9acfb5af9262020.jpg',
                },
                {
                    url: 'https://tsimg.cloud/127-89061/2b83dfa29f2f88bcb35372cbfbefe04a3f899d00.jpg',
                },
                {
                    url: 'https://tsimg.cloud/72975-12914/e087202f5badd652fd015d39df83c35065941fe5.png',
                },
                {
                    url: 'https://tsimg.space/v1/images/6ffbd340-a77b-e811-80d6-0025905a8161.jpg',
                },
                {
                    url: 'https://tsimg.space/v1/images/59a25b31-3997-e811-80d6-0025905a8161.jpg',
                    width: 500,
                    height: 300,
                },
            ],
        };
    }


    render() {
        const { images } = this.state;

        return (
            <div>
                {/* <Image image="https://tsimg.cloud/127-89061/2b83dfa29f2f88bcb35372cbfbefe04a3f899d00.jpg" onClick={console.log} style={{ width: '100px', height: '100px' }} styleLandscape={{ borderRadius: '10px' }} stylePortrait={{ border: '3px solid black' }} tools={[{ icon: 'ts-tobit', onClick: console.log }, { icon: 'ts-chayns', onClick: console.log }, { icon: 'ts-bamboo', onClick: console.log }]} /> */}
                <h3>5 images, different imageServices, 2 with preview</h3>
                <Gallery
                    style={{ marginBottom: '30px' }}
                    deleteMode
                    dragMode
                    images={images}
                    onDragEnd={(images) => {
                        this.setState({ images });
                    }}
                />
                {/* <h3>4 images, different imageServices, 2 with preview, height 300px</h3> */}
                {/* <Gallery */}
                {/*    style={{ marginBottom: '30px' }} */}
                {/*    images={[images[1], images[2], images[3], images[4]]} */}
                {/*    height={300} */}
                {/* /> */}
                {/* <h3>3 images, 2 with preview, width 200px</h3> */}
                {/* <Gallery style={{ marginBottom: '30px' }} images={[images[1], images[2], images[3]]} width={200} /> */}
                {/* <h3>2 images with preview</h3> */}
                {/* <Gallery style={{ marginBottom: '30px' }} images={[images[2], images[4]]} /> */}
                {/* <h3>1 image with preview</h3> */}
                {/* <Gallery style={{ marginBottom: '30px' }} images={[images[1]]} /> */}
                {/* <h3>1 image, height 300px</h3> */}
                {/* <Gallery style={{ marginBottom: '30px' }} images={[images[4]]} height={300} /> */}
            </div>
        );
    }
}
