import React from 'react'

export default function WidthHeightDemo() {
    return (
        <div className="h-screen">
            {/* Có thể canh theo rem hoặc em */}
            {/* h-screen w-screen nó sẽ full screen */}
            {/* Còn h-100 thì nó sẽ theo div cha */}
            {/* 4 rem = 16px */}
            <div className="bg-red-400 w-screen h-30">
                asd
            </div>
        </div>
    )
}
