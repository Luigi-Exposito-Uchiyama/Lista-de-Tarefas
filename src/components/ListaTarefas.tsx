// Importa o hook React useState
import React from "react";

// Importa os componentes FlatList, Text, Box, IconButton e Input da biblioteca NativeBase
import { FlatList, Text, Box, IconButton, Input } from 'native-base';

// Importa o ícone "trash" e "pencil" da biblioteca Ionicons
import { Ionicons } from '@expo/vector-icons';

// Importa o hook useEstadoGlobal do arquivo ../hooks/EstadoGlobal.tsx
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

// Interface que define os props do componente TarefaItem
interface TarefaItemProps {
  id: number; // Identificador único da tarefa
  tarefa: string; // Título da tarefa
}

// Componente "TarefaItem" - Representa um item individual na lista de tarefas
const TarefaItem: React.FC<TarefaItemProps> = ({ id, tarefa }) => {

  // **useEstadoGlobal** - Acessa o contexto global de estado e obtém as funções "editarTarefa" e "excluirTarefa"
  const { editarTarefa, excluirTarefa } = useEstadoGlobal();

  // **useState** - Define o estado local "editando" para controlar o modo de edição do item
  // O estado inicial é "false" (modo de exibição)
  const [editando, setEditando] = React.useState(false);

  // **useState** - Define o estado local "novoTitulo" para armazenar o novo título durante a edição
  // O estado inicial é o título original da tarefa ("titulo")
  const [novoTitulo, setNovoTitulo] = React.useState(tarefa);

  // **Função handleEditar** - Chamada ao clicar no botão de editar ou confirmar a edição
  const handleEditar = () => {

    // Se estiver no modo de edição (editando === true)
    if (editando) {

      // **Atualizar Tarefa** - Chama a função "editarTarefa" do contexto global
      // Passa o ID da tarefa e o novo título como parâmetros
      editarTarefa(id, novoTitulo);
    }

    // Alterna o modo de edição para o modo de exibição ou vice-versa
    setEditando(!editando);
  };

  // **Retorno** - Estrutura do componente "TarefaItem"
  return (
    <Box
      flexDirection="row" // Layout em linha
      justifyContent="space-between" // Alinhamento à direita
      alignItems="center" // Alinhamento vertical
      bg="gray.200" // Cor de fundo
      p={4} // Padding interno
      my={2} // Margem vertical
      mx={2} // Margem horizontal
      borderRadius={8} // Borda arredondada
      
    >
      {/* Modo de edição */}
      {editando ? (
        <Input
          flex={3} // Tamanho do input
          value={novoTitulo} // Valor do input é "novoTitulo"
          onChangeText={setNovoTitulo} // Função para atualizar "novoTitulo"
          fontSize={18}
        />
      ) : (
        // Modo de exibição
        <Text flex={3} fontSize={18}>{tarefa}</Text> // Exibe o título da tarefa
      )}

      {/* Botão de editar/confirmar */}
      <IconButton
        icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={14} color="#402291" />}
        colorScheme="light"
        onPress={handleEditar}
        style={{ borderRadius: 50, backgroundColor: 'gold', marginLeft: 4 }} // Estilo do botão
      />

      {/* Botão de excluir */}
      <IconButton
        icon={<Ionicons name="trash" size={14} color="#402291" />}
        colorScheme="light"
        onPress={() => excluirTarefa(id)} // Chama a função "excluirTarefa" ao clicar
        style={{ borderRadius: 50, backgroundColor: 'red', marginLeft: 4 }} // Estilo do botão
      />
    </Box>
  );
};

// Componente "ListaTarefas" - Exibe a lista completa de tarefas
const ListaTarefas: React.FC = () => {

  // **useEstadoGlobal** - Acessa o contexto global de estado e obtém a lista de tarefas "tarefas"
  const { tarefas } = useEstadoGlobal();

  // **Retorno** - Estrutura do componente "ListaTarefas"
  return (
    <FlatList
      data={tarefas} // Lista de tarefas a serem renderizadas
      renderItem={({ item }) => <TarefaItem id={item.id} tarefa={item.tarefa}  />} // Renderiza cada item da lista com TarefaItem
      keyExtractor={(item) => item.id.toString()} // Chave única para cada item (ID da tarefa)
      contentContainerStyle={{ flexGrow: 1 }} // Permite que a lista cresça para preencher o espaço disponível
      style={{ width: '100%', backgroundColor: 'rgb(33, 150, 243)' }} // Largura da lista
    />
  );
};

// Exporta o componente "ListaTarefas" para ser usado em outros arquivos
export default ListaTarefas;