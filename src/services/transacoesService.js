const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchTransacoes(token) {
  try {
    const data = await fetch(`${apiUrl}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.json();
  } catch (error) {
    console.error("Erro ao obter transações", error);
    return;
  }
}

export async function addTransacao(
  token,
  valor,
  categoriaNome,
  tipo,
  descricao,
) {
  try {
    const data = await fetch(`${apiUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ valor, categoriaNome, tipo, descricao }),
    });
    return data.json();
  } catch (error) {
    return console.error("Erro ao criar transação", error);
  }
}

export async function deleteTransacao(token, id) {
  try {
    const data = await fetch(`${apiUrl}/transactions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.json();
  } catch (error) {
    return console.error("Erro ao deletar transação", error);
  }
}
