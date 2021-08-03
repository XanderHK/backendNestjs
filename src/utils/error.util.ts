export async function handler(promise : Promise<any>) : Promise<{data : any, error : string}> {
    try{
        const data = await promise
        return {data : data, error : null}
    }catch(error){
        return {data : null, error : error}
    }
}