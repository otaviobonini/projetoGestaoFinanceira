const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchCategorias(token) {
  const res = await fetch(`${apiUrl}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addCategoria(token, nome, orcamento) {
  const res = await fetch(`${apiUrl}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome: nome,
      orcamento: Number(orcamento),
    }),
  });
  return res.json();
}

export async function deleteCategoria(token, id) {
  const res = await fetch(`${apiUrl}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
