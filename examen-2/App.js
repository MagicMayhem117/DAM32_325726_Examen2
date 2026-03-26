import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons"

export default function App() {
  var [ notificaciones, setNotificaciones ] = useState([]);
  const [ conteoNotif, setConteoNotif ] = useState(0);

  useEffect (() => {
    const interval = setInterval(() => {
      const newNot = (notificaciones.length + 1).toString();
      setNotificaciones([...notificaciones, {
        id: newNot,
        titulo: `Notificación #${newNot}`,
        leido: false
      }])
      setConteoNotif(conteoNotif + 1);
    }, 5000);

    return () => clearInterval(interval);    
  }, [notificaciones]);

  const setTrue = (id) => {
    setConteoNotif(conteoNotif - 1);
    setNotificaciones(notificaciones.map(notif => {
      if (notif.id === id) {
        return { ...notif, leido: true };
      }
      return notif;
    }
    ))
  }

  const setRead = () => {
    setConteoNotif(0);
    setNotificaciones(notificaciones.map(notif => {
      if (notif.leido === false) {
        return { ...notif, leido: true };
      }
      return notif;
    }
    ))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCont}>
          <View style={styles.contadorCont}>
            <Ionicons name="notifications" size={40} color={"gray"}></Ionicons>
            <View style={styles.numCont}>
              <Text style={styles.numNot}>{conteoNotif}</Text>
            </View>
          </View>
            <TouchableOpacity style={styles.markRead} onPress={() => setRead()}>
              <Text style={[styles.notifTitulo, { color: "white" }]}>Marcar como leído</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.divide}></View>
      </View>
      <Text style={styles.titulo}>Notificaciones</Text>
      <FlatList
        data={notificaciones}
        keyExtractor={item => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View>
            {!item.leido &&
              <TouchableOpacity style={[styles.Notif, {backgroundColor: "#6365d4"}]} onPress={() => setTrue(item.id)}>
                  <Text style={styles.notifTitulo}>{item.titulo}</Text>
              </TouchableOpacity>
            }
            {item.leido &&
              <View style={[styles.Notif, {backgroundColor: "#a8a9de"}]}>
                  <Text style={styles.notifTitulo}>{item.titulo}</Text>
              </View>
            }
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "flex-start"
  },
  header: {
    height: "17%",
    width: "100%",
    paddingTop: 50,
  },
  divide: {
    height: "3%",
    width: "100%",
    backgroundColor: "gray"
  },
  contadorCont: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerCont: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between"
  },
  numCont: {
    width: "auto",
    height: "auto",
    borderRadius: 20,
    backgroundColor: "red",
    alignItems: "center",
    paddingLeft: 3,
    paddingRight: 3
  },
  numNot: {
    fontWeight: "bold",
    color: "white"
  },
  list: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20
  },
  Notif: {
    width: "100%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "gray"
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20
  },
  notifTitulo: {
    fontSize: 20,
    fontWeight: "bold"
  },
  markRead: {
    height: "auto",
    width: "auto",
    backgroundColor: "red",
    borderRadius: 10,
    paddingLeft: 6,
    paddingRight: 6,
    justifyContent: "center"
  }
});
