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

router.post("/getnearestpoints", async (req, res) => {
    try {

        const { Lat, Long } = req.body;
        console.log(typeof(Lat))
        const farms = await db.select().from("farms")
        // console.log(farms)

        const nearestPoints = [];
        let numberofPoints = 3;
        for (let i = 0; i < numberofPoints; i++) {
            nearestPoints.push(
                {
                    id: null,
                    Dist: null
                }
            )
        }

        for (let farm of farms) {
            let Latf = farm["latitude"], Longf = farm["longitude"];

            const Distf = Math.sqrt((Lat-Latf)*(Lat-Latf) + (Long-Longf)*(Long-Longf));
            for (let point of nearestPoints) {
                if (point.id == null || point.Dist > Distf) {
                    point.id = farm["id"]
                    point.Dist = Distf
                    break;
                }
            }
        }

        let data = []

        for(let point of nearestPoints){
            for(let farm of farms){
                if(farm["id"] == point.id)
                    data.push(farm);
            }
        }

        // console.log(nearestPoints)
        res.status(200).json(data)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({error: "Internal Server Error"})
    }

})

router.get("/getPriceIndex", async (req, res) => {
        db.select().from("wholesale_price_indices")
        .then((price_index) => {
            res.json(price_index)
        })
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
    }
)
    
export default router