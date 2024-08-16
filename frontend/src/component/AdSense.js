import React, { useEffect } from 'react';

const AdSense = (props) => {
    const { className, width, height } = props;
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.setAttribute('data-ad-client', 'ca-pub-8429136628825533');
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    // Conditionally set styles based on props
    const adStyle = {
        display: 'block',
        width: width || 'auto',  // default to 'auto' if no width is provided
        height: height || 'auto', // default to 'auto' if no height is provided
    };

    // Conditionally set styles based on props
    const adContentStyle = {
        display: 'relative',
        width: width || 'auto',  // default to 'auto' if no width is provided
        height: height || 'auto', // default to 'auto' if no height is provided
    };

    return (
        <div className={`${className}`} style={(width && height) && adContentStyle}>
            <ins className="adsbygoogle"
                style={adStyle}
                data-ad-client="ca-pub-8429136628825533"
                data-ad-slot="6987607102"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdSense;
