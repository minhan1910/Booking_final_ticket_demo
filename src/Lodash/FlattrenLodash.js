import React from 'react';
import _ from 'lodash';

//Hay gặp trong phỏng vấn
export default function FlattrenLodash() {

    const arr = [[1, [2, [3, [4]]]]];

    const resultFlatten = _.flatten(arr);
    console.log(resultFlatten);

    const resultFlattenDeep = _.flattenDeep(arr);
    console.log(resultFlattenDeep);

    const nestedArr = [[1], [[1, 4, [5, 3]], [1, 2, 3, [3, 4, [2, [22, [3, 4, 5, 6, 5, [2]]]]], 4]]]

    //mordern version
    const myFlattenDeep = (arr) => {
        const flat = [];
        arr.forEach(item => {
            if(Array.isArray(item)) {
                return flat.push(...myFlattenDeep(item));
            } else {
                flat.push(item);
            }
        })
        return flat;
    };
    console.log('MyFlattenDeep',myFlattenDeep(nestedArr));

    return (
        <div>
            
        </div>
    )
}
