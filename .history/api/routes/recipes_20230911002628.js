const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const cloudinary = require("cloudinary")

const Recipe = require("../models/recipe")

cloudinary.config({ 
    cloud_name: 'recipefy', 
    api_key: '955791326567249', 
    api_secret: 'eov9GtpMryz7RyDxklsEfrcX6V4' 
  });

router.get("/", (req, res, next) => {
    Recipe.find()
        .limit(req.body.limit ?? 10)
        .skip(req.body.skip ?? 0)
        .exec()
        .then(doc => {
            //console.log(doc)
            console.log(req.headers)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post("/", (req, res, next) => {
    const data = req.body
    cloudinary.v2.uploader.upload(data.imageFile)
        .then(result=>console.log(result))

    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        summary: data.summary,
        rating: data.rating,
        coverImage: ""
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