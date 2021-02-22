import React from 'react'
import Preloader from '../components/common/preloader/Preloader'

export function withSuspend<WCP>(Component: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<Preloader />}>
                    <Component {...props} />
               </React.Suspense>
    }
}