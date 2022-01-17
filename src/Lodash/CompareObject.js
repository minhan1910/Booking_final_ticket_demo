import React from 'react'
import _ from 'lodash';
export default function CompareObject() {

    const arrA = [1, 2];
    const arrB = [2, 1];

    const arrObject1 = [
        {id: 1, name: 'An'},
        {id: 2, name: 'Min'},
    ];
    const arrObject2 = [
        {id: 1, name: 'An'},
        {id: 2, name: 'Min'},
        {id: 3, name: 'Pham'},
    ];

    const result = _.isEqual(arrA.sort(), arrB.sort());

    console.log('result', result);

    const result1 = _.differenceWith(arrObject1, arrObject2, _.isEqual);
    // => [] nó trả về giá trị khác nhau của 2 object
    //có các trường hợp của này
    //Trường hợp truyền obj1, obj2
    //vd: arr 1 có 2 object và arr2 có 3 object
    // Ở đây 2 index đầu giống nhau => []

    //arr 1 có 1 thằng khác thì nó sẽ trả ra cái object đó

    //còn truyền obj2, obj1 thì nó ngược lại trả các phần tử khác của obj2 so vs obj1
    console.log(result1)

    return (
        <div>
            
        </div>
    )
}
