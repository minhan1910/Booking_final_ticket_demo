import React from 'react'
import _ from 'lodash';
export default function ChunkLodash() {

    const arr = ['id', 1, 'name', 'An', 'info', 'cybersoft'];

    const result = _.chunk(arr, 2);

    const arrString = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11'];
    const resultChunkArrString = _.chunk(arrString, 2);
    console.log(resultChunkArrString);

    const myChunk = (arr, quantity) => {
        let result = [], lengthOfResult = 0;
        const n = arr.length;
        for(let i = 0; i < n; ++i) {
            if(!result[lengthOfResult]) {
                result[lengthOfResult] = [];
                let j;
                for(j = i; j < i + quantity; ++j) {
                    if(j < n) {
                        result[lengthOfResult].push(arr[j]);
                    } else {
                        break;
                    }
                }
                //reset lại index để split và push vào mảng mới
                i = j - 1;
                ++lengthOfResult;
            }
        }
        return result;
    }
    console.log('myChunk>>> ', myChunk(arrString, 2));

    return (
        <div>
            {result}
        </div>
    )
}
