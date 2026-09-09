import api from "./api";

// GET /api/contacts
export const getContacts = () => api.get("/contacts").then((res) => res.data);

// POST /api/contacts
export const addContact = (payload) =>
  api.post("/contacts", payload).then((res) => res.data);

// PUT /api/contacts/:id
export const updateContact = (id, payload) =>
  api.put(`/contacts/${id}`, payload).then((res) => res.data);

// DELETE /api/contacts/:id
export const deleteContact = (id) =>
  api.delete(`/contacts/${id}`).then((res) => res.data);
