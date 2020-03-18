import React, { Component } from 'react';
import Gallery from '../../src/react-chayns-gallery/component/Gallery';
import Image from '../../src/react-chayns-gallery/component/Image';
import ImageContainer from '../../src/react-chayns-gallery/component/ImageContainer';

export default class GalleryExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: ['https://tsimg.cloud/127-89061/9d6979d3ac95a053c532f86af9acfb5af9262020.jpg',
                'https://tsimg.cloud/127-89061/2b83dfa29f2f88bcb35372cbfbefe04a3f899d00.jpg',
                'https://tsimg.cloud/72975-12914/e087202f5badd652fd015d39df83c35065941fe5.png',
                'https://tsimg.space/v1/images/6ffbd340-a77b-e811-80d6-0025905a8161.jpg',
                'https://tsimg.space/v1/images/59a25b31-3997-e811-80d6-0025905a8161.jpg',
                'https://tsimg.space/v1/images/59a25b31-3997-e811-80d6-0025905a8161.jpg',
            ],
        };
    }


    render() {
        const { images } = this.state;

        return (
            <div>
                <h3>Gallery-Component</h3>
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={images}
                    dragMode
                    onDragEnd={(imgs) => {
                        this.setState({ images: imgs });
                    }}
                />
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={images}
                />
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={[images[0], images[1], images[2], images[3], images[4]]}
                />
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={[images[0], images[1], images[2], images[3]]}
                />
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={[images[0], images[1], images[2]]}
                />
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={[images[0], images[1]]}
                />
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={[images[0]]}
                />
                <h3>Image-Component</h3>
                <Image
                    image={images[0]}
                    onClick={console.log}
                    style={{ width: '100px', height: '100px', marginBottom: '30px' }}
                    styleLandscape={{ borderRadius: '10px' }}
                    stylePortrait={{ border: '3px solid black' }}
                />
                <Image
                    image={images[0]}
                    preventParams
                />
                <h3>ImageContainer-Component</h3>
                <ImageContainer
                    tools={[
                        { icon: 'fa fa-rocket', onClick: console.log },
                        { icon: 'ts-tobit', onClick: console.log },
                        { icon: 'ts-wrong', onClick: console.log },
                        { icon: 'ts-check', onClick: console.log },
                    ]}
                    style={{ marginBottom: '30px' }}
                >
                    <Image
                        image={images[0]}
                        onClick={console.log}
                    />
                </ImageContainer>
            </div>
        );
    }
}
