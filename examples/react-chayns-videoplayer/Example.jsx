import React from 'react';
import VideoPlayer from '../../src/react-chayns-videoplayer/component/VideoPlayer';

const VideoPlayerExample = () => {
    return (
        <div>
            <VideoPlayer
                sources={[
                    {
                        src:
                            'https://video.tsimg.space/77890-31547/150136b4-d8b2-4a0f-867e-857a2353c798.mp4',
                    },
                ]}
                icon="fa fa-volume"
                onVideoEnd={() => {
                    console.log('video end');
                }}
                onUnMute={() => {
                    console.log('video unmute');
                }}
            />
        </div>
    );
};

export default VideoPlayerExample;
