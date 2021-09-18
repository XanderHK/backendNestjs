export const handler = async <T> (promise : Promise<T>) : Promise<[T, string]> => {
    try{
        const data = await promise
        return [data, null]
    }catch(error){
        return [null, error]
    }
}


const last = <T> (arr : T[]) : T => { 
    return arr[arr.length - 1]
}

const lastElement : number = last([1, 2, 3])
const lastElement2 : string = last(["1", "2", "3"])


const makeArr = <X, Y = number> (x : X, y : Y) : [X, Y]=> {
    return [x, y]
}

const v1 = makeArr(5, 6)
const v2 = makeArr("a", 1)
const v3 = makeArr<number, null>(1, null)

const makeFullName = <T extends {firstName: string; lastName:string}>(obj : T) => {
    return {
        ...obj, 
            fullName: obj.firstName + ' ' + obj.lastName
    }
}


const v4 = makeFullName({firstName : "bob", lastName : "cruise", age : 19})

interface Tab<T> {
    id : string;
    position: number;
    data : T;
}

type NumberTab = Tab<number>