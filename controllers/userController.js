const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserController = async (req, res) => {
  try {
    const { nama, email, password, confPassword } = req.body;

    // validasi: data harus terisi semua
    if (!nama || !email || !password || !confPassword) {
      return res.status(400).json({
        status: "error",
        message:
          "Semua data nama, email, password, dan confPassword harus diisi",
      });
    }

    // validasi: jika password != confPassword
    if (password !== confPassword) {
      // berikan response error
      return res.status(400).json({
        status: "error",
        message: "password dan confPassword tidak sama",
      });
    }

    // validasi: cek apakah Email sudah digunakan
    checkUserWithEmail = await User.findOne({
      where: {
        email,
      },
    });
    if (checkUserWithEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email sudah digunakan",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // buat object newUser
    const newUser = {
      email,
      nama,
      password: hashPassword,
    };

    // proses add user
    await User.create(newUser);

    // berikan response berhasil
    return res.json({
      status: "success",
      message: "User berhasil dibuat",
      data: {
        email,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const loginUserController = async (req, res) => {
  try {
    // mengambil data dari req.body
    const { email, password } = req.body;

    // validasi: jika user tidak / kurang mengirimkan data
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Harap untuk memasukkan email dan password",
      });
    }

    // validasi: check user ada atau tidak
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email salah",
      });
    }

    // validasi: password benar atau tidak
    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword) {
      return res.status(401).json({
        status: "error",
        message: "Password salah",
      });
    }

    // membuat token jwt
    const token = jwt.sign(
      { email, password },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );

    // berikan response success
    return res.header("Authorization", token).json({
      status: "success",
      message: "Login berhasil",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
