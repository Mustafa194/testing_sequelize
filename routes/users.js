const express = require("express");
const { User } = require("../models");

// const apiErrorHandler = require("../middlewares/api_error_handler");

const router = express.Router();

router.post("/", async(req, res, next) => {
    const { name, email, role } = req.body;

    try {
        const user = await User.create({ name, email, role });

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get("/", async(req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

router.get("/:uuid", async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        });

        if (user === null) {
            return res.status(400).json({ error: "User not found" });
            // throw new Error("badRequest");
        }

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

router.delete("/:uuid", async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: { uuid: req.params.uuid },
        });

        if (user === null) {
            return res.status(400).json({ error: "There is not such user" });
        }

        user.destroy();

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

router.delete("/", async(req, res) => {
    try {
        const users = await User.destroy({
            where: {},
            truncate: true,
        });

        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

router.put("/:uuid", async(req, res) => {
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
            return res.status(400).json({ error: "There is no such user" });
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
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;