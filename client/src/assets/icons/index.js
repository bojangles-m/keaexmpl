import React from 'react';

import DownloadOnTheAppStoreBadge from './DownloadOnTheAppStoreBadge';
import GooglePlayDownloadAndroidApp from './GooglePlayDownloadAndroidApp';

const icon = (props) => {
    switch (props.name) {
        case 'DownloadOnTheAppStoreBadge':
            return <DownloadOnTheAppStoreBadge {...props} />;
        case 'GooglePlayDownloadAndroidApp':
            return <GooglePlayDownloadAndroidApp {...props} />;
        default:
            return <div />;
    }
};

export default icon;
