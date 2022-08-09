import { Status } from '../models/Status.js';
import { Workers } from '../models/workers.js';
import { Elements } from '../models/Elements.js';
import { getErrorResponseFormat } from "../helpers/errorFunctions.js";
import { getSucessResponseFormat } from "../helpers/errorFunctions.js";

export const getStatus = async (req, res) => {
    Status.find({}, { __v: 0 })
        .then(data => {
            res.status(200).json(getSucessResponseFormat(data));
        })
        .catch(error => {
            res.status(500).json(getErrorResponseFormat("Ha ocurrido un error"));
        })
}

export const getElements = async (req, res) => {
    Elements.find({}, { __v: 0 })
        .populate({ path: 'status', select: 'name' })
        .populate({ path: 'trabajador', select: 'name' })
        .then(data => {
            res.status(200).json(getSucessResponseFormat(data));
        }).catch(error => {
            console.log(error)
            res.status(500).json(getErrorResponseFormat("Ha ocurrido un error"));
        })
}

export const createElements = async (req, res) => {
    const body = req.body;
    try {
        let element = await Elements.findOne({ longitud: body.longitud, latitud: body.latitud });

        let worker = await Workers.findOne({ _id: body.trabajador });

        if (element) {
            return res.status(400).json(getErrorResponseFormat("Elemento ya existe"));
        } else {

            if(!worker) return res.status(400).json(getErrorResponseFormat("No existe ese trabajador"));

            const status = await Status.findOne({ name: "Creado" })
            if (status) {
                body.status = status._id;
            }
            await Elements.create(body)
                .then((data) => {
                    res.status(200).json(getSucessResponseFormat("Elemento creadao exitosamente!"));
                }).catch((error) => {
                    res.status(400).json(getErrorResponseFormat("Ha ocurrido un error, intente mas tarde"));
                })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(getErrorResponseFormat("Server error"));
    }
}

export const updateElements = async (req, res) => {
    const body = req.body;
    const data = {
        longitud: body.longitud,
        latitud: body.latitud,
        status: body.status,
    }
    try {
        let element = await Elements.findById(body.id);
        if (!element) {
            return res.status(400).json(getErrorResponseFormat("No existe el elemento que desea actualizar"));
        } else {
            await Elements.findByIdAndUpdate({ _id: body.id }, data)
                .then((data) => {
                    res.status(200).json(getSucessResponseFormat("Elemento actualizado correctamente!"));
                }).catch((error) => {
                    res.status(500).json(getErrorResponseFormat("Ha ocurrido un error, intente mas tarde"));
                })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(getErrorResponseFormat("Server error"));
    }
}

export const deleteElements = async (req, res) => {
    const id = req.params.id;
    try {
        let element = await Elements.findById(id);
        if (!element) {
            return res.status(400).json(getErrorResponseFormat("No existe el elemento que desea eliminar"));
        } else {
            await Elements.findByIdAndDelete({ _id: id })
                .then((data) => {
                    res.status(200).json(getSucessResponseFormat("Elemento eliminado correctamente!"));
                }).catch((error) => {
                    res.status(500).json(getErrorResponseFormat("Ha ocurrido un error, intente mas tarde"));
                })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(getErrorResponseFormat("Server error"));
    }
}