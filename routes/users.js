const express = require("express");
const { User } = require("../models");
const { badRequest, internal } = require("../middlewares/ApiError");

const router = express.Router();

router.post("/", async(req, res, next) => {
    const { name, email, role } = req.body;

    try {
        const user = await User.create({ name, email, role });

        return res.json(user);
    } catch (err) {
        // console.log(err);
        // return res.status(500).json(err);
        internal(new Error("Something went wrong"), req, res, next);
    }
});

router.get("/", async(req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        // console.log(err);
        // return res.status(500).json({ error: "Something went wrong" });
        internal(new Error("Something went wrong"), req, res, next);
    }
});

router.get("/:uuid", async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        });

        if (user === null) {
            badRequest(new Error("User not found"), req, res, next);
            return;
            // return res.status(400).json({ error: "User not found" });
            // throw new Error("badRequest");
        }

        return res.json(user);
    } catch (err) {
        // console.log(err);
        // return res.status(500).json({ error: "Something went wrong" });
        internal(new Error("Something went wrong"), req, res, next);
    }
});

router.delete("/:uuid", async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        });

        if (user === null) {
            // return res.status(400).json({ error: "There is not such user" });
            badRequest(new Error("There is no such user"), req, res, next);
            return;
        }

        user.destroy();

        return res.json(user);
    } catch (err) {
        // console.log(err);
        // return res.status(500).json({ error: "Something went wrong" });
        internal(new Error("Something went wrong"), req, res, next);
    }
});

router.delete("/", async(req, res, next) => {
    try {
        const users = await User.destroy({
            where: {},
            truncate: true,
        });

        return res.json(users);
    } catch (err) {
        // console.log(err);
        // return res.status(500).json({ error: "Something went wrong" });
        internal(new Error("Something went wrong"), req, res, next);
    }
});

router.put("/:uuid", async(req, res, next) => {
    try {
        // let name = req.body.name ?
        //     req.body.name :
        //     await User.findOne({
        //         where: { uuid: req.body.uuid },
        //     }).name;

        // let email = req.body.email ?
        //     (email = req.body.email) :
        //     await User.findOne({
        //         where: { uuid: req.body.uuid },
        //     }).email;

        // let role = req.body.role ?
        //     (role = req.body.role) :
        //     await User.findOne({
        //         where: { uuid: req.body.uuid },
        //     }).role;

        // const user = await User.update({
        //     name,
        //     email,
        //     role,
        // }, {
        //     where: { uuid: req.params.uuid },
        // });

        const user = await User.findOne({ where: { uuid: req.params.uuid } });

        if (user === null) {
            // return res.status(400).json({ error: "There is no such user" });
            badRequest(new Error("There is no such user"), req, res, next);
            return;
        }

        let name = req.body.name ? req.body.name : user.name;
        let email = req.body.email ? req.body.email : user.email;
        let role = req.body.role ? req.body.role : user.role;

        user.set({
            name,
            email,
            role,
        });

        return res.json(user);
    } catch (err) {
        // console.log(err);
        // return res.status(500).json({ error: "Something went wrong" });
        internal(new Error("Something went wrong"), req, res, next);
    }
});

module.exports = router;