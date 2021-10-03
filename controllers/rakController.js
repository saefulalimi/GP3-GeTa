const modelRak = require("../models").rak;

class rakController {
    static post = async (req, res, next) => {
        try {
            const { lemariId } = req.body;

            const cekInput = 
                lemariId != "" &&
                lemariId != null;

            if (!cekInput) {
                const newError = new Error();
                newError.name = "InputRequired";
                newError.message = "Silahkan cek inputan anda kembali";
                throw newError;
            }

            const cekLemari = await modelRak.findOne({
                where: {
                    lemariId : lemariId
                }
            });

            if (cekLemari) {
                const newError = new Error();
                newError.name = "LemariAlreadyRegistered";
                newError.message = "Lemari sudah terdaftar";
                throw newError;
            }

            const newLemari = {
                lemariId: lemariId
            };

            const lemari = await modelRak.create(newLemari);
            res.status(201).json({
                message: "Sukses mendaftarkan lemari",
                lemariId: lemari.id
            })

            // if(lemariId.length !== 0) {
            //     const dataRak = {
            //         lemariId: lemariId
            //     }
            //     const rak = await modelRak.create(dataRak);
            //     res.status(201).json({
            //         message: "Success create rak!",
            //         rak: rak
            //     });
            // };
        } catch (error) {
            next(error)
        }
    }

    static getAll = async (req, res, next) => {
        try {
            const rak = await modelRak.findAll();
            res.status(200).json({
                message: "Succes get all data",
                rak: rak
            });

        } catch (error) {
            const newError = new Error();
            newError.name = "AccessDenied",
            newerror.message = "Anda tidak mempunyai hak akses!"
            next(newError)
        }
    }

    static getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const currentUser = req.currentUser;

            if(currentUser.role == "admin") {
                const rak = await modelRak.findOne({
                    where: {
                        id: id
                    }
                });

                if(!rak) {
                    const newError = new Error();
                    newError.name = "RakNotFound";
                    newError.message = "Rak tidak ditemukan";
                    throw newError;
                }
                res.status(200).json({
                    message: "Sukses mengambil data!",
                    rak: rak
                });
            }

            const data = await modelRak.findOne({
                where: {
                    id: id
                }
            });
                
            if(!data) {
                const newError = new Error();
                newError.name = "RakNotFound";
                newError.message = "Id Rak tidak ditemukan";
                throw newError;
            }

            if(Number(id) != currentUser.id) {
                const newError = new Error();
                newError.name = "Forbidden";
                newError.message = "Anda tidak dapat mengakses data ini";
                throw newError;
            }

            const rak = await modelRak.findOne({
                where: {
                    id: id
                }
            });

            if(!rak) {
                const newError = new Error();
                newError.name = "RakNotFound";
                newError.message = "Rak tidak ditemukan";
                throw newError;
            }

            res.status(200).json({
                message: "Sukses mendapatkan data",
                data: rak
            });
        } catch (error) {
            next(error);
        }
    };

    static update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { lemariId } = req.body;
            
        } catch (error) {
            
        }
    }

}





module.exports = rakController;