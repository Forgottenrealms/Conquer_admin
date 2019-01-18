import axios from 'axios'

const isDEV = process.env.NODE_ENV === "development"
const ajax = axios.create({
    baseURL: isDEV ? "http://rap2api.taobao.org/app/mock/124760" : ""
})

export const getDataTables = () => {
    return ajax.post("/api/data/tables")
}
export const getDataDetails = (id) => {
    return ajax.post("/api/data/details", id)
}