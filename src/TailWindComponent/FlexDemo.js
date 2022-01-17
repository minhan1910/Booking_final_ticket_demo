import React from 'react'

export default function FlexDemo() {
    return (
        <div className="w-screen h-screen bg-purple-400">
            <div className="flex flex-row h-1/2 w-full bg-green-400 justify-center items-center">
                {/* Khoảng 160 px = 10rem */}
                <div className="fItem h-10 w-10 bg-black"></div>
                <div className="fItem h-10 w-10 bg-red-400"></div>
                <div className="fItem h-10 w-10 bg-blue-400"></div>
            </div>
        </div>
    )
}
