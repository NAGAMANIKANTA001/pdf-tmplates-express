const express = require("express");
const router = express.Router()
const Template = require("../models/template");

router.get("/", async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/:id", getTemplate, (req, res) => {
    res.json(res.template)
})

router.post("/", async (req, res) => {
    const template = new Template({
        name: req.body.name,
        templateString: req.body.templateString
    })

    try {
        const newTemplate = await template.save();
        res.status(201).json(newTemplate)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch("/:id", getTemplate, async (req, res) => {
    if (req.body.name != null) {
        res.template.name = req.body.name
    }
    if (req.body.templateString != null) {
        res.template.templateString = req.body.templateString
    }
    try {
        const updatedTemplate = await res.template.save()
        res.json(updatedTemplate)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete("/:id", getTemplate, async (req, res) => {
    try {
        console.log(res.template)
        await res.template.deleteOne()
        res.json({ message: "Deleted Template" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTemplate(req, res, next) {
    let template
    try {
        template = await Template.findById(req.params.id)
        if (!template) {
            return res.status(404).json({ message: "Cannot find template" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.template = template;
    return next();
}
module.exports = router;