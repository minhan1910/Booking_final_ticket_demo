import React from 'react'
import _ from 'lodash';
export default function SortLodash() {

    const users = [
        {id: 1, name: 'Fred', age: 48},
        {id: 5, name: 'Kaito', age: 36},
        {id: 9, name: 'Kaito', age: 40},
        {id: 10, name: 'Kaito', age: 32},
        {id: 7, name: 'Bake', age: 40},
        {id: 0, name: 'Juld', age: 34},
    ];

    const resultSortByAge = _.sortBy(users, [item => item.name]);
    console.log('resultSortByAge',resultSortByAge);

    //sort theo tiêu chí
    const result = _.sortBy(users, ['name', 'age']);
    
    console.log(result);

    return (
        <div>
            
        </div>
    )
}
