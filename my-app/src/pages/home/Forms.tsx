import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import AntDesign from "@react-native-vector-icons/ant-design";

import { TextInput, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./formsStyle";

export default function Forms() {
  const [importance, setChecked] = useState<string>("");
  const [limitTime, setDate] = useState<Date>(new Date());
  const [title, setInputTitle] = useState<string>("");
  const [task, setInputTask] = useState<string>("");
  const [showCalendario, setCalendario] = useState<boolean>(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || limitTime;
    setCalendario(Platform.OS === "ios");
    setDate(currentDate);
    console.log(limitTime);
  };

  const addNewTask = async () => {
    if (!title || !task || !importance) {
      Alert.alert("Preencha os espaços para criar uma tarefa.");
    } else {
      try {
        const response = await fetch("http://192.168.1.100:3000/createTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            importance,
            task,
            limitTime,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          Alert.alert("Tarefa adicionada com sucesso!");
          console.log(data);
        } else {
          console.log("Falha ao adicionar tarefa!");
        }
        setDate(new Date());
        setInputTask("");
        setInputTitle("");
        setChecked("");
      } catch (error) {
        console.log("erro:", error);
      }
    }
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Tarefa:</Text>

      <View style={styles.divForms}>
        <View style={styles.forms}>
          {/* Campo de título */}
          <TextInput
            mode="outlined"
            label="Título"
            style={{ backgroundColor: "#1E293B", width: "90%" }}
            activeOutlineColor="#38BDF8"
            outlineColor="#b7bdc7"
            textColor="white"
            value={title}
            onChangeText={(value) => setInputTitle(value)}
            right={<TextInput.Icon icon="pencil-box" color="#38BDF8" />}
          />

          {/* Campo de descrição da tarefa */}
          <TextInput
            mode="outlined"
            label="Digite sua tarefa"
            style={{ backgroundColor: "#1E293B", width: "90%" }}
            activeOutlineColor="#38BDF8"
            outlineColor="#b7bdc7"
            textColor="white"
            value={task}
            onChangeText={(value) => setInputTask(value)}
            right={<TextInput.Icon icon="subtitles-outline" color="#38BDF8" />}
          />

          <TouchableOpacity
            style={styles.btnCalendar}
            onPress={() => setCalendario(true)}
          >
            <AntDesign
              name="calendar"
              size={20}
              color="#38BDF8"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.textCalendario}>
              Selecionar prazo de entrega
            </Text>
          </TouchableOpacity>

          {showCalendario && (
            <DateTimePicker
              value={limitTime}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <Text style={styles.textTitle}>
          Selecione a importância dessa tarefa:
        </Text>

        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioCard,
              {
                borderColor: "#10B981",
                backgroundColor:
                  importance === "tranquilo" ? "#D1FAE5" : "#1E293B",
              },
            ]}
            onPress={() => setChecked("tranquilo")}
          >
            <RadioButton
              value="tranquilo"
              status={importance === "tranquilo" ? "checked" : "unchecked"}
              uncheckedColor="#10B981"
              color="#10B981"
              onPress={() => setChecked("tranquilo")}
            />
            <Text style={styles.radioLabel}>Tranquilo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioCard,
              {
                borderColor: "#F59E0B",
                backgroundColor:
                  importance === "importante" ? "#FEF3C7" : "#1E293B",
              },
            ]}
            onPress={() => setChecked("importante")}
          >
            <RadioButton
              value="importante"
              status={importance === "importante" ? "checked" : "unchecked"}
              uncheckedColor="#F59E0B"
              color="#F59E0B"
              onPress={() => setChecked("importante")}
            />
            <Text style={styles.radioLabel}>Importante</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioCard,
              {
                borderColor: "#EF4444",
                backgroundColor:
                  importance === "urgente" ? "#FECACA" : "#1E293B",
              },
            ]}
            onPress={() => setChecked("urgente")}
          >
            <RadioButton
              value="urgente"
              status={importance === "urgente" ? "checked" : "unchecked"}
              uncheckedColor="#EF4444"
              color="#EF4444"
              onPress={() => setChecked("urgente")}
            />
            <Text style={styles.radioLabel}>Urgente</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnAdd} onPress={() => addNewTask()}>
          <Text style={{ fontSize: 20, color: "#E2E8F0", fontWeight: "600" }}>
            Adicionar Tarefa
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
