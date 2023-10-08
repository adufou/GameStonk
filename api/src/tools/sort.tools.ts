/*
 * Sorts an array in place by a property
 */
const ascSort = <T>(array: T[], property: string): T[] => {
    const res = array.sort((a: T, b: T) => {
        console.log(
            a, b, property, a[ property ], b[ property ]
        );
        
        if (a[ property ] < b[ property ]) {
            return -1;
        }
        if (a[ property ] > b[ property ]) {
            return 1;
        }
        return 0;
    });
    
    return res;
};

const sortTools = { ascSort };

export default sortTools; 
