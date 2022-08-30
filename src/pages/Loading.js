import React from 'react'
import ReactLoading from 'react-loading';
import { color } from '../utils/uiMap';

export default function Loading() {
    return (
        <div className='flex h-screen'>
            <div class="m-auto">
                <ReactLoading type={'spinningBubbles'} color={color.theme} height={100} width={100} />
            </div>
        </div>
    )
}
