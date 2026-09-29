import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

export default function App() {
  const [produto, setProduto] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [editando, setEditando] = useState(null);

  function adicionarProduto() {
    if (produto.trim() === "") return;

    setProdutos([...produtos, produto.trim()]);
    setProduto("");
  }

  function editarProduto(index) {
    setProduto(produtos[index]);
    setEditando(index);
  }

  function salvarEdicao() {
    if (produto.trim() === "") return;

    const novaLista = [...produtos];
    novaLista[editando] = produto.trim();

    setProdutos(novaLista);
    setProduto("");
    setEditando(null);
  }

  function removerProduto(index) {
    setProdutos(produtos.filter((_, i) => i !== index));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛒 Lista de Compras</Text>
      <Text style={styles.subtitulo}>Organize seus produtos</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um produto..."
        value={produto}
        onChangeText={setProduto}
      />

      <Pressable
        style={styles.botao}
        onPress={editando === null ? adicionarProduto : salvarEdicao}
      >
        <Text style={styles.textoBotao}>
          {editando === null ? "ADICIONAR" : "SALVAR"}
        </Text>
      </Pressable>

      {editando !== null && (
        <Pressable
          onPress={() => {
            setProduto("");
            setEditando(null);
          }}
        >
          <Text style={styles.cancelar}>Cancelar edição</Text>
        </Pressable>
      )}

      <View style={styles.cabecalhoLista}>
        <Text style={styles.tituloLista}>Produtos</Text>
        <Text style={styles.contador}>{produtos.length}</Text>
      </View>

      {produtos.map((item, index) => (
        <View style={styles.item} key={index}>
          <Text style={styles.nome}>{item}</Text>

          <View style={styles.acoes}>
            <Pressable onPress={() => editarProduto(index)}>
              <Text style={styles.editar}>✏️</Text>
            </Pressable>

            <Pressable onPress={() => removerProduto(index)}>
              <Text style={styles.excluir}>🗑️</Text>
            </Pressable>
          </View>
        </View>
      ))}

      {produtos.length === 0 && (
        <Text style={styles.vazio}>Nenhum produto adicionado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98aabda1",
    padding: 25,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0a0d50",
    textAlign: "center",
  },

  subtitulo: {
    textAlign: "center",
    color: "#152350",
    marginTop: 5,
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#bfc9e2",
    borderWidth: 1,
    borderColor: "#49519d",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },

  botao: {
    backgroundColor: "#151759",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  cancelar: {
    textAlign: "center",
    color: "#777777",
    marginTop: 10,
  },

  cabecalhoLista: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 12,
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  contador: {
    backgroundColor: "#dce3ef",
    color: "#0c386a",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 20,
  },

  item: {
    backgroundColor: "#0d286b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nome: {
    fontSize: 17,
    color: "#fff",
    flex: 1,
  },

  acoes: {
    flexDirection: "row",
    gap: 12,
  },

  editar: {
    fontSize: 18,
  },

  excluir: {
    fontSize: 18,
  },

  vazio: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});