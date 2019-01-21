const express = require("express")
const { Router } = express
const bodyParser = require("body-parser")
const cors = require("cors")
const Mock = require("mockjs")

const app = new express()

const data = Mock.mock({
    "code": "200",
    "data|50": [
      {
        "id|+1": 10050,
        "customer": "@name",
        "price": "@float(10,1000,1,1)0$",
        "amount": "@integer(1,20)",
        "createAT": "@datetime(T)",
        "record|+1": 51,
        "shipTo": "@name",
        "Status|1": [
          "Pending",
          "On Hold",
          "Closed",
          "Fraud"
        ],
        "key": "@id"
      }
    ]
})

const router = new Router()
const dataRouter = router.post("/api/data/tables", (req, res) => {
                            res.json(data)
                        })
                        .post("/api/data/details", (req, res) => {
                            res.json({
                                "code": "200",
                                "data|50": [
                                    {
                                    "id|+1": 10050,
                                    "msg": "查看数据详情成功"
                                    }
                                ]
                            })
                        })

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use(dataRouter)

app.listen(5000, () => {
    console.log("Runnig in port 5000")
})