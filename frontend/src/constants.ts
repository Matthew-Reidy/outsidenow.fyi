export const BASE_URL = "https://5etrbmkj7k.execute-api.us-west-1.amazonaws.com/dev"

export type citiesandcatergories = {
    locations: Array<citiesobj>,
    catergories: Array<catobj>
}

export type citiesobj ={
    locid: number,
    locname: string
}

export type catobj ={
    event_id: number,
    event_name: string

}

export const authConstants = { 
    respType:"code",
    client_id:"m19g69r0847adtpadms8vpje5",
    redirecturi:"http://localhost:3000"
}