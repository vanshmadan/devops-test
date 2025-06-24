const Sketch = require('../models/sketch');

exports.metaData = async (req, res) => {

    const sketch = new Sketch(req.body);
    try {
        const sketchOutput = await sketch.save()
        return res.status(200).json(sketchOutput);
    } catch (err) {
        console.log("error of metadata", err.message);
        return res.status(500).json({ message: err.message })
    }

}

exports.allSketches = async (req, res) => {

    try {
        let allSketches = await Sketch.find({});
        return res.status(200).json({ allSketches });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }

}

exports.addUserToSketch = async (req, res) => {
    try {
        console.log("req.body", req.body);
        let updatedSketch = await Sketch.findOneAndUpdate({ '_id': req.body.sketchId },
            { '$addToSet': { 'userId': req.body.userId } }, { new: true })
        // console.log("updatedske", {updatedSketch})
        return res.status(200).json({ updatedSketch });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
}

exports.sketchWithUserInfo = async (req, res) => {
    try {
        let sketch = await Sketch.findById(req.body.sketchId).populate("userId");
        return res.status(200).json({ sketch });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
}

exports.sketchById = async (req, res) => {
    try {
        console.log("req.body.sketchId", req.body.sketchId);
        let sketch = await Sketch.findById(req.body.sketchId);
        res.status(200).json({ sketch });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
}

exports.updateSketch = async (req, res) => {
    try {
        let updatedOutput = await Sketch.findByIdAndUpdate(req.body.sketchId, { base64: req.body.base64, name: req.body.name, $addToSet: { userId: req.body.userId } }, { new: true, useFindAndModify: false })
        return res.status(200).json(updatedOutput);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
}