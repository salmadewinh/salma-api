const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getDataHandphone(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tabel_handphone;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                });
            connection.release();
        })
    },
    getDataHandphoneByID(req, res) {
        let id_HP = req.params.id_HP;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(

                `
                SELECT * FROM tabel_handphone WHERE id_HP = ?;
                `, [id_HP],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                });
            connection.release();
        })
    },
    addDataHandphone(req, res) {
        let data = {
            nama_HP: req.body.nama_HP,
            jenis_HP: req.body.jenis_HP,
            nomor_seri_HP: req.body.nomor_seri_HP,
            tanggal_produksi: req.body.tanggal_produksi
        }
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO tabel_handphone SET ?;
                `, [data],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil tambah data!',
                    });
                });
            connection.release();
        })
    },
    editDataHandphone(req, res) {
        let dataEdit = {
            nama_HP: req.body.nama_HP,
            jenis_HP: req.body.jenis_HP,
            nomor_seri_HP: req.body.nomor_seri_HP,
            tanggal_produksi: req.body.tanggal_produksi
        }
        let id_HP = req.body.id_HP
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE tabel_handphone SET ? WHERE id_HP = ?;
                `, [dataEdit, id_HP],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil edit data!',
                    });
                });
            connection.release();
        })
    },
    deleteDataHandphone(req, res) {
        let id_HP = req.body.id_HP
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM tabel_handphone WHERE id_HP = ?;
                `, [id_HP],
                function (error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil hapus data!'
                    });
                });
            connection.release();
        })
    }
}