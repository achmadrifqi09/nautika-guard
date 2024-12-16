import Joi from "joi";

export const eventValidationSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Judul harus diisi",
    }),
    description: Joi.string().required().messages({
        "any.required": "Deskripsi harus diisi",
    }),
    team: Joi.string().required().messages({
        "any.required": "Tim harus diisi",
    }),
    date: Joi.string().required().messages({
        "any.required": "Tanggal harus diisi",
    }),
    location: Joi.string().required().messages({
        "any.required": "Lokasi harus diisi",
    }),
    time: Joi.string().required().messages({
        "any.required": "Waktu harus diisi",
    }),
    equipment: Joi.string().required().messages({
        "any.required": "Peralatan harus diisi",
    }),
    activity: Joi.string().required().messages({
        "any.required": "Aktivitas harus diisi",
    }),
    event_type: Joi.string().required().messages({
        "any.required": "Aktivitas harus diisi",
    }),
    deadline: Joi.string().required().messages({
        "any.required": "Aktivitas harus diisi",
    }),
});
