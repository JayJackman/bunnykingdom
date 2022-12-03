
export type Position =
{
    row: number
    col: number
}

// export type Color =
// {
//     r: number
//     g: number
//     b: number
//     a: number
// }


export function shuffleArray<T>(array: T[])
{
    for (let i = array.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}
