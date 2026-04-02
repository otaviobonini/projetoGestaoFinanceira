const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchMetas(token) {
  const res = await fetch(`${apiUrl}/metas`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function addMeta(token, nome, desc, obj, date) {
  const res = await fetch(`${apiUrl}/metas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome,
      descMeta: desc,
      objetivo: obj,
      dataConclusao: date,
    }),
  });
  return res.json();
}

export async function deleteMeta(token, id) {
  const res = await fetch(`${apiUrl}/metas/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function addValorMeta(token, id, valor) {
  const res = await fetch(`${apiUrl}/metas/add-value/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ valor }),
  });
  return res.json();
}

export async function removeValorMeta(token, id, valor) {
  const res = await fetch(`${apiUrl}/metas/remove-value/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ valor }),
  });
  return res.json();
}
