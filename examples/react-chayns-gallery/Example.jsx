import React, { PureComponent } from 'react';

import Gallery from '../../src/react-chayns-gallery/component/Gallery';

export default class GalleryExample extends PureComponent {
    render() {
        const images = [
            {
                url: 'https://tsimg.cloud/127-89061/9d6979d3ac95a053c532f86af9acfb5af9262020.jpg',
                preview: '/9j/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAAoADwDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAgABAwT/xAAjEAEAAwABBQABBQAAAAAAAAABAAIRIQMSMUFRgSJCYWKx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBMVH/2gAMAwEAAhEDEQA/APN2JVc4mViOo9oewyb0qi8+DlgOleQzl+zerRDN9h4iAd4y3khFbnd6fEjXAek+mFMvzPStV7ahv+Tj1acNh3PMUnira1Hh5Zyva1rKvMlcyGVlpOlDZzBDfUdHIM674mBZ5++oba2NR/tFU7jfnr7Le67hmASNIUM7T8MzqNu12mGRGVWr5/awdS36f5eJBxSGJMhmmSrxXfktV3dlKTDXSt3znP2bXqZZsvuUpYUep1C3g/MDbXXllKIWsXXmGUoH/9k=',
                width: 640,
                height: 426,
            },
            {
                url: 'https://tsimg.cloud/127-89061/2b83dfa29f2f88bcb35372cbfbefe04a3f899d00.jpg',
                preview: '/9j/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAAoABsDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAgEAEAAwABBQADAAAAAAAAAAABAAIRIRIxQVFhAzKh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAAMAAAAAAAAAAAAAAAAAAAERIf/aAAwDAQACEQMRAD8A06V9Qy3qD0j+5KpYHuQqqCHJHueIFyxw6SFdgcoJyYx7YrnSb88ydfMuhtjiZ0KtUrm/2GfYrKWfUW/YuQOVOebepf41bdT3yEJQrZrWz3eH1MksOdLCED//2Q==',
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
            }
        ];

        return (
            <div>
                <h3>5 images, different imageServices, 2 with preview</h3>
                <Gallery style={{ marginBottom: '30px' }} images={images}/>
                <h3>4 images, different imageServices, 2 with preview, height 300px</h3>
                <Gallery
                    style={{ marginBottom: '30px' }}
                    images={[images[1], images[2], images[3], images[4]]}
                    height={300}
                />
                <h3>3 images, 2 with preview, width 200px</h3>
                <Gallery style={{ marginBottom: '30px' }} images={[images[1], images[2], images[3]]} width={200}/>
                <h3>2 images with preview</h3>
                <Gallery style={{ marginBottom: '30px' }} images={[images[2], images[4]]}/>
                <h3>1 image with preview</h3>
                <Gallery style={{ marginBottom: '30px' }} images={[images[1]]}/>
                <h3>1 image, height 300px</h3>
                <Gallery style={{ marginBottom: '30px' }} images={[images[4]]} height={300}/>
            </div>
        );
    }
}
