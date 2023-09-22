const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")

const Ingredient = require("../models/ingredient")



router.get("/", (req, res, next) => {
    Ingredient.find()
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

    const ingredient = new Ingredient({
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        vegan: data.vegan,
        vegetarian: data.vegetarian,
    })

    console.log(data)

    ingredient.save()
        .then(
            result => {
            console.log(result)
            res.status(201).json({
                message: "New ingredient created",
                ingredientCreated: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.get("/byName/:wildcard", (req, res, next) => {
    const wildcard = req.params.wildcard

    Ingredient.find({"name" : {$regex : wildcard, $options: 'i'}})
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

router.get("/:ingredientId", (req, res, next) => {
    const id = req.params.ingredientId

    Ingredient.findById(id)
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

router.patch("/:ingredientId", (req, res, next) => {
    const id = req.params.ingredientId
    const data = req.body

    const updateOps = {}

    for (const ops of data){
        updateOps[ops.propName] = ops.value
    }

    Ingredient.updateMany({_id: id}, {$set: updateOps})
        .exec()
            .then(doc => {
                if(doc){
                    console.log(doc)
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

router.delete("/:ingredientId", (req, res, next) => {
    const id = req.params.ingredientId

    Ingredient.deleteMany({_id: id})
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