const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")

const RecipeSection = require("../models/recipeSections")



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

    for (const section of data){
        const recipeSection = new RecipeSection({
            _id: new mongoose.Types.ObjectId(),
            recipeId: new mongoose.Types.ObjectId(section.recipeId),
            title: section.title,
            richText: section.richText,
            order: section.order
        })

        recipeSection.save()
        .then(
            result => {
            console.log(result)
            res.status(201).json({
                message: "New recipe section created",
                recipeSectionCreated: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
    }
})

router.get("/:recipeSectionId", (req, res, next) => {
    const id = req.params.recipeSectionId

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

router.patch("/:recipeSectionId", (req, res, next) => {
    const id = req.params.recipeSectionId
    const data = req.body

    const updateOps = {}

    for (const ops of data){
        updateOps[ops.propName] = ops.value
    }

    

    Recipe.updateMany({_id: id}, {$set: updateOps})
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

router.delete("/:recipeSectionId", (req, res, next) => {
    const id = req.params.recipeSectionId

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