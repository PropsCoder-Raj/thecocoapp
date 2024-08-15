import React, { useEffect } from 'react';

const AdSense = (props) => {
    const { className } = props;
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

    return (
        <div className={`${className}`}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-8429136628825533"
                data-ad-slot="6987607102"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default AdSense;
