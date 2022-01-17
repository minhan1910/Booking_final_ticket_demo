import React from 'react';

export default function DemoGrid() {
    return (
        <div className="container">
            {/* 1 rem = 16px */}
            {/* Lấy 0.25 rem * với số sau gap là ra */}
            <div className="grid grid-cols-5 gap-3">
                <div className="bg-red-400">1</div>
                <div className="bg-green-400">2</div>
                <div className="bg-blue-400">3</div>
                <div className="bg-orange-400">4</div>
                <div className="bg-yellow-400">5</div>
            </div>
        </div>
    )
}
