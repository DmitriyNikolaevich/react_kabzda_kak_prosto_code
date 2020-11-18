import React from 'react';
import Preloader from '../components/common/preloader/Preloader';

export const withSuspend = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<Preloader />}>
                    <Component {...props} />
               </React.Suspense>
    };
}