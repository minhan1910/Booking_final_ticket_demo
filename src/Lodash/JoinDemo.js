import React from 'react';
import _ from 'lodash';

export default function JoinDemo() {

    let arr = ['An', 'Hung', 'Nguyen'];

    let arrPerson = [
        {id: 1, name: 'An'},
        {id: 2, name: 'Hung'},
        {id: 3, name: 'Nguyen'},
    ];

    //es6
    const result = arr.join('-');

    //Lodash
    const resultLodash = _.join(arr, '*');

    const person = _.find(arrPerson, item => item.id === 2);

    return (
        <div>
            {result}    
            <br/>        
            <div>
                <p>Name: {person.name} - ID: {person.id}</p>
            </div>
        </div>
    )
}
