'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireDefault(_isString);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _youtubePlayer = require('youtube-player');

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

var _isNumeric = require('is-numeric');

var _isNumeric2 = _interopRequireDefault(_isNumeric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @typedef {string} YoutubePlayer~playbackState
 * @value 'unstarted' Stops and cancels loading of the current video. [stopVideo]{@link https://developers.google.com/youtube/iframe_api_reference#stopVideo}
 * @value 'playing' Plays the currently cued/loaded video. [playVideo]{@link https://developers.google.com/youtube/iframe_api_reference#playVideo}
 * @value 'paused' Pauses the currently playing video. [pauseVideo]{@link https://developers.google.com/youtube/iframe_api_reference#pauseVideo}
 */

/**
 * @property {string} videoId
 * @property {string|number} width (default: '100%').
 * @property {string|number} height (default: '100%').
 * @property {YoutubePlayer~playbackState} playbackState
 * @property {Object} configuration Configuration parameters to be passed to the YouTube Player (known as `playerVars` in the YouTube Player API for iframe Embeds, https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters).
 */

var ReactYoutubePlayer = (function (_React$Component) {
    _inherits(ReactYoutubePlayer, _React$Component);

    function ReactYoutubePlayer() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, ReactYoutubePlayer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactYoutubePlayer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.setRealPlaybackState = function (stateName) {
            _this.realPlaybackState = stateName;
        }, _this.getRealPlaybackState = function () {
            return _this.realPlaybackState;
        }, _this.bindEvent = function () {
            _this.player.on('stateChange', function (event) {
                var realPlaybackState = undefined;

                _this.setRealPlaybackState(ReactYoutubePlayer.stateNames[event.data]);

                realPlaybackState = _this.getRealPlaybackState();

                if (realPlaybackState === 'ended') {
                    _this.props.onEnd(event);
                } else if (realPlaybackState === 'playing') {
                    _this.props.onPlay(event);
                } else if (realPlaybackState === 'paused') {
                    _this.props.onPause(event);
                } else if (realPlaybackState === 'buffering') {
                    _this.props.onBuffer(event);
                }
            });

            _this.player.on('error', function (event) {
                _this.props.onError(event);
            });
        }, _this.diffState = function (prevProps, nextProps) {
            // console.log('prevProps', prevProps, 'nextProps', nextProps);

            if (_this.realPlaybackState !== nextProps.playbackState && nextProps.playbackState) {
                _this.setPlaybackState(nextProps.playbackState);
            }

            if (prevProps.videoId !== nextProps.videoId && nextProps.videoId) {
                _this.cueVideoId(nextProps.videoId);
            }

            // console.log('prevProps.width !== nextProps.width', prevProps.width !== nextProps.width);

            if (prevProps.width !== nextProps.width) {
                _this.setViewportWidth(nextProps.width);
            }

            if (prevProps.height !== nextProps.height) {
                _this.setViewportHeight(nextProps.height);
            }
        }, _this.setPlaybackState = function (stateName) {
            if (stateName === 'playing') {
                _this.player.playVideo();
            } else if (stateName === 'paused') {
                _this.player.pauseVideo();
            } else if (stateName === 'unstarted') {
                _this.player.stopVideo();
            } else {
                throw new Error('Invalid playback state ("' + stateName + '").');
            }
        }, _this.cueVideoId = function (videoId) {
            // console.log('videoId', videoId);

            if (!(0, _isString2.default)(videoId)) {
                throw new Error('videoId parameter must be a string.');
            }

            _this.player.cueVideoById(videoId);
        }, _this.setViewportWidth = function (width) {
            _this.setDimension('width', width);
        }, _this.setViewportHeight = function (height) {
            _this.setDimension('height', height);
        }, _this.setDimension = function (name, size) {
            var formattedSize = undefined;

            if (!size) {
                _this.refs.player.style.removeProperty(name);
            } else {
                formattedSize = size;

                if ((0, _isNumeric2.default)(formattedSize)) {
                    formattedSize += 'px';
                }

                _this.refs.viewport.style[name] = formattedSize;
            }
        }, _this.mutePlayer = function () {
            _this.player.mute();
        }, _this.setVolume = function (volume) {
            if (volume < 0) {
                volume = 0;
            } else if (volume > 100) {
                volume = 100;
            }
            _this.player.setVolume(volume);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /* eslint-enable camelcase, id-match */

    _createClass(ReactYoutubePlayer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.player = (0, _youtubePlayer2.default)(this.refs.player, {
                playerVars: this.props.configuration
            });

            this.bindEvent();

            this.diffState({}, this.props);
            if (this.props.configuration.mute === 1) {
                this.mute();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.diffState(this.props, nextProps);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            // console.log('shouldComponentUpdate', 'this.props', this.props);

            return false;
        }

        /**
         * State set using 'state' property can change, e.g.
         * 'playing' will change to 'ended' at the end of the video.
         * Read playback state reflects the current player state
         * and is used to compare against the video player properties.
         *
         * @param {string} stateName
         * @returns {undefined}
         */

        /**
         * @returns {string}
         */

        /**
         * Used to map YouTube IFrame Player API events to the callbacks
         * defined using the component instance properties.
         *
         * @returns {undefined}
         */

        /**
         * The complexity of the ReactYoutubePlayer is that it attempts to combine
         * stateless properties with stateful player. This function is comparing
         * the last known property value of a state with the last known state of the player.
         * When these are different, it initiates an action that changes the player state, e.g.
         * when the current "state" property is "play" and the last known player state is "pause",
         * then setPlaybackState method will be called.
         *
         * @param {Object} prevProps
         * @param {Object} nextProps
         * @returns {undefined}
         */

        /**
         * @param {string} stateName
         * @returns {undefined}
         */

        /**
         * @param {string} videoId
         * @returns {undefined}
         */

        /**
         * Update element's width without calling the render method.
         *
         * @param {string|number} width
         * @returns {undefined}
         */

        /**
         * Update element's height without calling the render method.
         *
         * @param {string|number} height
         * @returns {undefined}
         */

        /**
         * @param {string} name
         * @param {string|number} size
         * @returns {undefined}
         */

    }, {
        key: 'render',

        /**
         * @returns {ReactElement}
         */
        value: function render() {
            var style = undefined;

            style = {
                width: '100%',
                height: '100%',
                display: 'block'
            };

            return _react2.default.createElement(
                'div',
                { ref: 'viewport', style: style },
                _react2.default.createElement('div', { ref: 'player', style: style })
            );
        }
    }]);

    return ReactYoutubePlayer;
})(_react2.default.Component);

ReactYoutubePlayer.stateNames = {
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'cued'
};
ReactYoutubePlayer.propTypes = {
    // https://developers.google.com/youtube/iframe_api_reference#onReady
    // onReady: React.PropTypes.func,

    // https://developers.google.com/youtube/iframe_api_reference#onStateChange
    // onStateChange: React.PropTypes.func,

    // https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange
    // onPlaybackQualityChange: React.PropTypes.func,

    // https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange
    // onPlaybackRateChange: React.PropTypes.func,

    // https://developers.google.com/youtube/iframe_api_reference#onApiChange
    // onApiChange: React.PropTypes.func,

    onBuffer: _react2.default.PropTypes.func,

    // https://developers.google.com/youtube/iframe_api_reference#onStateChange
    onEnd: _react2.default.PropTypes.func,
    // https://developers.google.com/youtube/iframe_api_reference#onError
    onError: _react2.default.PropTypes.func,

    onPause: _react2.default.PropTypes.func,
    onPlay: _react2.default.PropTypes.func,

    /* eslint-disable camelcase, id-match */
    configuration: _react2.default.PropTypes.shape({
        autoplay: _react2.default.PropTypes.oneOf([0, 1]),
        cc_load_policy: _react2.default.PropTypes.oneOf([0, 1]),
        color: _react2.default.PropTypes.oneOf(['red', 'white']),
        controls: _react2.default.PropTypes.oneOf([0, 1, 2]),
        disablekb: _react2.default.PropTypes.oneOf([0, 1]),
        enablejsapi: _react2.default.PropTypes.oneOf([0, 1]),
        end: _react2.default.PropTypes.number,
        fs: _react2.default.PropTypes.oneOf([0, 1]),
        hl: _react2.default.PropTypes.string,
        iv_load_policy: _react2.default.PropTypes.oneOf([1, 3]),
        list: _react2.default.PropTypes.oneOf(['search', 'user_uploads', 'playlist']),
        listType: _react2.default.PropTypes.oneOf(['playlist', 'search', 'user_uploads']),
        loop: _react2.default.PropTypes.oneOf([0, 1]),
        modestbranding: _react2.default.PropTypes.oneOf([0, 1]),
        origin: _react2.default.PropTypes.string,
        playlist: _react2.default.PropTypes.string,
        playsinline: _react2.default.PropTypes.oneOf([0, 1]),
        rel: _react2.default.PropTypes.oneOf([0, 1]),
        showinfo: _react2.default.PropTypes.oneOf([0, 1]),
        start: _react2.default.PropTypes.number,
        theme: _react2.default.PropTypes.oneOf(['dark', 'light']),
        mute: _react2.default.PropTypes.oneOf([0, 1])
    }) };
ReactYoutubePlayer.defaultProps = {
    width: '100%',
    height: '100%',
    playbackState: 'unstarted',
    configuration: {},
    onEnd: function onEnd() {},
    onPlay: function onPlay() {},
    onPause: function onPause() {},
    onBuffer: function onBuffer() {},
    onError: function onError() {}
};
exports.default = ReactYoutubePlayer;
//# sourceMappingURL=index.js.map
