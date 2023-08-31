const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")

const Recipe = require("../models/recipe")



router.get("/", (req, res, next) => {

    

    Recipe.find()
        .limit(req.body.limit ?? 10)
        .skip(req.body.skip ?? 0)
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
                res.status(500).json({error: err})
        })
})

router.post("/", (req, res, next) => {
    const data = req.body

    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        summary: data.summary,
        rating: data.rating,
        coverImage: data.coverUrl
    })

    recipe.save()
        .then(
            result => {
            console.log(result)
            res.status(201).json({
                message: "New recipe created",
                recipeCreated: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.get("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId

    Recipe.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if(doc){
                res.status(200).json(doc)
            }
            else{
                res.status(404).json({message: "No valid entry"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.patch("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId
    const data = req.body

    const updateOps = {}

    console.log({...data})
    for (const ops of {...data}){
        updateOps[ops.propName] = ops.value
    }

    Recipe.updateOne({_id: id}, {$set: updateOps})
        .exec()
            .then(doc => {
                console.log(doc)
                if(doc ){
                    res.status(200).json(doc)
                }
                else{
                    res.status(404).json({message: "No valid entry for update"})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({error: err})
            })
})

router.delete("/:recipeId", (req, res, next) => {
    const id = req.params.recipeId

    Recipe.deleteMany({_id: id})
        .exec()
            .then(doc => {
                console.log(doc)
                if(doc ){
                    res.status(200).json(doc)
                }
                else{
                    res.status(404).json({message: "No valid entry for deletion"})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({error: err})
            })
})

module.exports = router 