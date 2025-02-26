const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: "success",
        message: "Catatan berhasil ditambahkan!",
        data: {
          noteId: id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: "fail",
      message: "Gagal menambahkan catatan",
    })
    .code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 200,
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h
    .response({
      status: "fail",
      message: "Catatan tidak ditemukan",
    })
    .code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h
      .response({
        status: "success",
        message: "Catatan berhasil diperbarui",
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: "fail",
      message: "Gagal memperbarui catatan. ID tidak ditemukan",
    })
    .code(404);
  return response;
};

const deleteNoteById = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h
      .response({
        status: "success",
        message: "Catatan berhasil dihapus",
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: "fail",
      message: "Catatan gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteById,
};
