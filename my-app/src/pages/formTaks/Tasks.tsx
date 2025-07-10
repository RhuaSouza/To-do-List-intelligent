import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "./tasksStyle";
import react, { useEffect, useState } from "react";

export default function Tasks() {
  interface InfoTasks {
    id: number;
    title: string;
    importance: string;
    date: Date;
    task: string;
    limitTime: Date;
  }

  const isFocused = useIsFocused();
  const [data, setData] = useState<Array<InfoTasks>>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTextMap, setEditTextMap] = useState<{ [key: number]: string }>({});
  const [checked, setChecked] = useState<number>(0);

  // Retorna cor com base na importância
  const getImportanceColor = (color: string) => {
    switch (color) {
      case "urgente":
        return "#ef4444a5";
      case "importante":
        return "#f59f0bde";
      case "tranquilo":
        return "#10b981c4";
      default:
        return "#E2E8F0";
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await fetch("http://192.168.1.100:3000/tasks", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("erro:", error);
    }
  };

  const EditTask = async (id: number) => {
    try {
      const updatedText = editTextMap[id];
      const response = await fetch(
        `http://192.168.1.100:3000/updateTask/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task: updatedText }),
        }
      );

      if (response.ok) {
        setEditId(null);
        getAllTasks();
        Alert.alert("Tarefa atualizada com sucesso!");
      } else {
        Alert.alert("Erro ao atualizar tarefa.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function DeleteTaks() {
    try {
      const response = await fetch(
        `http://192.168.1.100:3000/deleteTask/${checked}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        const erroTexto = await response.text();
        console.log("Erro ao deletar:", erroTexto);
        Alert.alert("Erro ao deletar a tarefa.");
        return;
      }
      setData((prevData) => prevData.filter((task) => task.id !== checked));
      Alert.alert("Tarefa apagada com sucesso!");
      setChecked(0);
    } catch (error) {
      console.log("erro:", error);
    }
  }

  const CorrectDate = (date: Date | string) => {
    if (!date) return " Data nao informada";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Data inválida";
    return parsedDate.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    if (isFocused) getAllTasks();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}>Minhas Tarefas:</Text>

      {/* Lista horizontal de tarefas */}
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item: any, index: number) => (
          <View
            style={[
              styles.card,
              { marginRight: index === data.length - 1 ? 0 : 20 },
              { borderColor: getImportanceColor(item.importance) },
            ]}
            key={item.id}
          >
            <View style={styles.rowRadio}>
              <RadioButton
                value={item.id}
                status={checked === item.id ? "checked" : "unchecked"}
                uncheckedColor={getImportanceColor(item.importance)}
                color={getImportanceColor(item.importance)}
                onPress={() => setChecked(item.id)}
              />
            </View>

            <View style={styles.infoTask}>
              <Text style={styles.titulo}>{item.title}</Text>

              <TextInput
                key={item.id}
                mode="outlined"
                style={styles.input}
                textColor="white"
                cursorColor={getImportanceColor(item.importance)}
                selectionColor={getImportanceColor(item.importance)}
                outlineStyle={{
                  borderColor: getImportanceColor(item.importance),
                }}
                editable={editId === item.id}
                value={
                  editTextMap[item.id] !== undefined
                    ? editTextMap[item.id]
                    : item.task
                }
                onChangeText={(value) =>
                  setEditTextMap((prev) => ({ ...prev, [item.id]: value }))
                }
                multiline
              />
              <Text style={styles.prazo}>
                Prazo: {CorrectDate(item.limitTime)}
              </Text>
              <Text
                style={[
                  styles.importancia,
                  { color: getImportanceColor(item.importance) },
                ]}
              >
                Importância: {item.importance}
              </Text>
            </View>

            <View style={styles.viewButtons}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  if (editId === item.id) {
                    EditTask(item.id);
                  } else {
                    setEditId(item.id);
                    setEditTextMap((prev) => ({
                      ...prev,
                      [item.id]: item.task,
                    }));
                  }
                }}
              >
                <Text style={styles.textBTN}>
                  {editId === item.id ? "Salvar" : "Editar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.btn} onPress={() => DeleteTaks()}>
        <Text style={styles.textBTN}>Excluir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
