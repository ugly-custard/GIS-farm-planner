import { Router } from "express"
import db from "../db/db.js"

const router = Router()

router.get("/", (req, res) => {
    res.send("hello world")
})

router.get("/farms", (req, res) => {
    db.select().from("farms")
        .then((farms) => {
            res.json(farms)
        })
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
})

export default router