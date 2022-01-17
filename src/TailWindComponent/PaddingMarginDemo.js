import React from 'react'

export default function PaddingMarginDemo() {
    return (
        //mỗi cái là p-n -> n là 0.25 rem = 16px
        <div className="container">
            <br/>
            <button className="bg-red-200 px-5" style={{width: 'auto', marginTop: 15}}>
                div padding div id vasdasd
            </button>

            <br/>
            <button className="bg-purple-400 mt-5">
                cyberlearn
            </button>
        </div>
    )
}
