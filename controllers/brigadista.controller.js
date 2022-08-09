import { Brigade } from "../models/Brigadista.js";
import { Workers } from '../models/workers.js';
import { getErrorResponseFormat } from "../helpers/errorFunctions.js";
import { getSucessResponseFormat } from "../helpers/errorFunctions.js";


export const getBrigadistas = async (req, res) => {
    try {
        await Brigade.find({}, { __v: 0 })
            .then((data) => {
                res.status(200).json(getSucessResponseFormat(data));
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json(getErrorResponseFormat("Ha ocurrido un error"));
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error" });
    }
}

export const createBrigade = async (req, res) => {
    const body = req.body;

    try {
        let brigade = await Brigade.findOne({ name: body.name, vehicle_plate: body.vehicle_plate });

        if (brigade) {
            return res.status(400).json(getErrorResponseFormat("Brigade already exists"));
        } else {
            body.estado = true;
            await Brigade.create(body)
                .then((data) => {
                    res.status(200).json(getSucessResponseFormat("Brigada creada correctamente!"));
                })
                .catch((error) => {
                    res.status(400).json(getErrorResponseFormat("Something went wrong"));
                })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error" });
    }
}

export const updateBrigade = async (req, res) => {
    const body = req.body;
    try {
        await Brigade.findByIdAndUpdate({ _id: body.id }, { name: body.name, vehicle_plate: body.vehicle_plate })
            .then((data) => {
                res.status(200).json(getSucessResponseFormat("Brigada actualizada correctamente!"));
            })
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).json(getErrorResponseFormat("Ya existe una brigada con ese nombre o placa"));
                }
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error" });
    }

}

export const deleteBrigade = async (req, res) => {
    const { id } = req.params;
    try {
        await Workers.updateMany({ brigada: id }, { $set: { brigada: null } }).exec();
        await Brigade.findByIdAndDelete({ _id: id })
            .then((data) => {
                res.status(200).json(getSucessResponseFormat("Brigada eliminada correctamente!"));
            })
            .catch((error) => {
                console.log(error)
                res.status(400).json(getErrorResponseFormat("Something went wrong"));
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error" });
    }
}


