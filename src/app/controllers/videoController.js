const Video = require("../models/video");
const { to } = require("../../helpers/assyncronous");
const mongoose = require("mongoose");
const {
    loginErrors,
    registerErrors,
    unknownErrors,
    notProvideds
} = require("../../config/errors.js");
const { query } = require("express");

const population = {
    path: "lesson",
    populate: {
        path: "section",
        populate: {
            path: "subject",
            populate: {
                path: "knowledge"
            }
        }
    }
};

function isAnObjectId(string) {
    if (!string) return false;
    try {
        mongoose.Types.ObjectId(string)
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    async index(req, res) {
        const { page = 1, limit = 20, lesson } = req.query;
        const query = isAnObjectId(lesson) ? { lesson } : {};
        const video = await Video.paginate(query, { page: page, limit: limit });
        return res.json(video);
    },
    async show(req, res) {
        const video = await Video.findById(req.params.id);

        video.populate(population, (err, resp) => {
            res.json(resp);
        });
    },
    async store(req, res) {
        const { title, link, lesson } = req.body;

        if (!title) return res.status(400).send(notProvideds.titleNotProvided);

        if (!link) return res.status(400).send(notProvideds.linkNotProvided);

        if (!lesson)
            return res.status(400).send(notProvideds.lessonNotProvided);

        const [video, error] = await to(Video.create(req.body));
        if (error)
            res.status(400).send({
                error: "Erro ao adicionar vídeo " + error,
                code: unknownErrors.unknownCreateVideoErrorCode
            });
        return res.status(201).send(video);
    },
    async update(req, res) {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        return res.json(video);
    },
    async destroy(req, res) {
        await Video.findByIdAndRemove(req.params.id);

        return res.status(204).send();
    }
};
