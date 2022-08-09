import { Workers } from '../models/workers.js';
import { Brigade } from "../models/Brigadista.js";
import { Elements } from '../models/Elements.js';
import { getErrorResponseFormat } from "../helpers/errorFunctions.js";
import { getSucessResponseFormat } from "../helpers/errorFunctions.js";

export const getWorkers = async (req, res) => {
    try {
        await Workers.find({}, { __v: 0 })
            .populate({ path: 'brigada', select: 'name vehicle_plate ' })
            .then((data) => {
                res.status(200).json(getSucessResponseFormat(data));
            })
            .catch((error) => {
                res.status(200).json(getErrorResponseFormat("Ha ocurrido un error"))
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json(getErrorResponseFormat("Ha ocurrido un error"))
    }
}

export const createWorkers = async (req, res) => {
    const body = req.body;

    try {
        let worker = await Workers.findOne({ cedula: body.cedula });

        if (worker) {
            return res.status(400).json(getErrorResponseFormat("Worker already exists"));
        } else {
            const brigada = await Brigade.findOne({ _id: body.brigada })
            if (!brigada) {
                return res.status(400).json(getErrorResponseFormat("No existe esa brigada"));
            }
            await Workers.create(body)
                .then((data) => {
                    res.status(200).json(getSucessResponseFormat("Trabajador creado correctamente!"));
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

export const updateWorkers = async (req, res) => {
    const body = req.body;

    const data = {
        name: body.name,
        cedula: body.cedula,
        tel: body.tel,
        ocupacion: body.ocupacion,
        brigada: body.brigada,
    }

    try {
        const brigada = await Brigade.findOne({ _id: body.brigada })
        if (!brigada) {
            return res.status(400).json(getErrorResponseFormat("No existe esa brigada"));
        }
        await Workers.findByIdAndUpdate({ _id: body.id }, data)
            .then(() => {
                res.status(200).json(getSucessResponseFormat("Trabajador actualizado correctamente!"));
            })
            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).json(getErrorResponseFormat("Ya existe un trabajador con esa cedula"));
                }
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json(getErrorResponseFormat("Error del servidor"));
    }
}

export const deleteWorkers = async (req, res) => {
    const { id } = req.params;
    try {
        await Elements.deleteMany({ trabajador: id })
        await Workers.findByIdAndDelete({ _id: id })
            .then(() => {
                res.status(200).json(getSucessResponseFormat("Trabajador eliminado correctamente!"));
            })
            .catch((error) => {
                res.status(400).json(getErrorResponseFormat("Error al eliminar el trabajador"));
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json(getErrorResponseFormat("Error del servidor"));
    }
}
