const Todo = require("../models").Todo;
const { nanoid } = require("nanoid");

const addTodoController = async (req, res) => {
  try {
    const id = nanoid(6);
    const todo = req.body.todo;

    // validasi: jika user tidak mengirimkan data todo
    if (!todo) {
      return res.status(400).json({
        status: "error",
        message: "Mohon untuk memasukkan data todo",
      });
    }

    // buat objek new todo
    const newTodo = {
      id,
      todo,
    };

    // memasukkan data
    await Todo.create(newTodo);

    //
    return res.status(201).json({
      message: "Todo berhasil dibuat",
      data: {
        todoId: id,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTodosController = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.json(todos);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getTodoByIdController = async (req, res) => {
  try {
    // ambil id dari req.params.id
    const id = req.params.id;

    // cari data berdasarkan id
    const todo = await Todo.findOne({
      where: {
        id: id,
      },
    });

    // validasi: jika todo tidak ditemukan
    if (!todo) {
      // berikan response error
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }

    // berikan response success
    return res.json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editTodoByIdController = async (req, res) => {
  try {
    // mengambil id dari req.params
    const id = req.params.id;

    // cari todo berdasarkan id
    const todo = await Todo.findOne({
      where: {
        id: id,
      },
    });

    // validasi: jika todo tidak ditemukan
    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }

    // mengambil data req.body.todo
    const newTodo = req.body.todo;

    // validasi: jika tidak mengirimkan data todo
    if (!newTodo) {
      return res.status(400).json({
        status: "error",
        message: "Mohon untuk memasukkan data todo yang baru",
      });
    }

    // buat new objek toto
    const newObjectTodo = {
      id,
      todo: newTodo,
    };

    // proses update
    await Todo.update(newObjectTodo, {
      where: {
        id: id,
      },
    });

    // berikan response success
    return res.json({
      status: "success",
      message: "Data berhasil diubah",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTodoByIdController = async (req, res) => {
  try {
    // mengambil id dari req.params.id
    const id = req.params.id;

    // cari data berdasarkan id
    const todo = await Todo.findOne({
      where: {
        id: id,
      },
    });

    // validasi: jika data todo tidak ditemukan
    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak titemukan",
      });
    }

    // proses hapus
    await Todo.destroy({
      where: {
        id: id,
      },
    });

    // berikan response success
    return res.json({
      status: "success",
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTodoController,
  getTodosController,
  getTodoByIdController,
  editTodoByIdController,
  deleteTodoByIdController,
};
