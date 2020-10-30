/**
 * @component
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import Icon from '../../react-chayns-icon/component/Icon';
import './VideoPlayer.scss';

/**
 * Video player which tries to auto play video
 */
const VideoPlayer = ({
    style,
    className,
    sources,
    reference,
    onUnMute,
    onVideoEnd,
    poster,
    icon,
}) => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        const currentVideoRef = videoRef.current;
        const handleBodyClick = () => {
            currentVideoRef.muted = false;
            setMuted(false);
            onUnMute();

            if (currentVideoRef.paused) {
                currentVideoRef.play();
            }
        };

        const handleEnd = () => {
            onVideoEnd();
        };

        const result = currentVideoRef.play();

        if (result) {
            result
                .then(() => {
                    onUnMute();
                    setMuted(false);
                })
                .catch(() => {
                    currentVideoRef.muted = true;
                    currentVideoRef.play();
                    document.addEventListener('click', handleBodyClick);
                    setMuted(true);
                });
        }

        currentVideoRef.addEventListener('ended', handleEnd);

        return () => {
            document.removeEventListener('click', handleBodyClick);
            currentVideoRef.removeEventListener('ended', handleEnd);
        };
    }, [onUnMute, onVideoEnd]);

    return (
        <div
            className={classnames('video-player', className)}
            style={style}
            ref={reference}
        >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                poster={poster}
                ref={videoRef}
                playsInline
                src={sources[0].src}
            >
                {sources.map((source) => (
                    <source
                        src={source.src}
                        type={source.type || 'video/mp4'}
                    />
                ))}
            </video>
            <div className="icon-wrapper">
                {muted ? <Icon icon={icon} /> : false}
            </div>
        </div>
    );
};

VideoPlayer.propTypes = {
    /**
     * A React style object that will be applied to the video wrapper.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A classname string that will be applied to the video wrapper.
     */
    className: PropTypes.string,

    /**
     * A function that will be invoked with a reference to the
     *  video wrapper.
     */
    reference: PropTypes.func,

    /**
     * Specifies an image to be shown while the video is downloading, or until the user hits the play button
     */
    poster: PropTypes.string,

    /**
     * The <video> tag contains one or more <source> tags with different video sources. The browser will choose the first source it supports.
     */
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string,
            type: PropTypes.string,
        })
    ).isRequired,

    /**
     * Displays an icon on the right side of the video when muted.
     * Supply a FontAwesome-string like `"fa fa-mute"`.
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * Is called when video is unmuted or directly played (with sound)
     */
    onUnMute: PropTypes.func,

    /**
     * Is called when video ends
     */
    onVideoEnd: PropTypes.func,
};

VideoPlayer.defaultProps = {
    style: null,
    className: null,
    reference: null,
    poster: null,
    icon: 'fa fa-volume',
    onUnMute: () => {},
    onVideoEnd: () => {},
};

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
