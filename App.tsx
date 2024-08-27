import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PillAdder from './public/components/PillAdder'
import PillTaker from './public/components/PillTaker'
import PillManager from './public/components/PillManager'
import PillHistory from './public/components/PillHistory'
import PillModal from './public/components/PillModal';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();
import { Pill, Dose, SessionDate } from './public/types'

function App(): React.JSX.Element {
  // const [pills, setPills] = useState<Pill[]>([])
  const [pills, setPills] = useMMKVStorage<Pill[]>('pills', storage, [])
  const [pillTrash, setPillTrash] = useMMKVStorage<Pill[]>('pillTrash', storage, [])
  const [pillAdderOpen, setPillAdderOpen] = useState(false)
  const [pillManagerOpen, setPillManagerOpen] = useState(false)
  const [pillTakerOpen, setPillTakerOpen] = useState(false)
  const [pillHistoryOpen, setPillHistoryOpen] = useState(false)
  const [pillHistory, setPillHistory] = useMMKVStorage<SessionDate[]>('pillHistory', storage, [])
  const [newStyle, setNewStyle] = useMMKVStorage<boolean>('newStyle', storage, false)

  // setPills([])
  // setPillTrash([])
  const addPill = (name: string, dosage : number, unit : string) => {
    const pill = {
      name: name,
      dosage: dosage,
      unit: unit
    }
    const oldPills = pills
    let matchingPill = false
    oldPills.forEach((oldPill) => {
      if(oldPill.name === pill.name && oldPill.dosage === pill.dosage && oldPill.unit === pill.unit) {
        matchingPill = true;
        return
      }
    })
    if(matchingPill) {
      Alert.alert('You already have a pill with that Name, Dosage, and Unit')
    } else {
      const newPills = sortPills(oldPills.concat([pill]))
      setPills(newPills)
      setPillAdderOpen(false)
    }
  }

  const takePills = (session: Dose[]) => {
    const pillSwallow = {
      session: session,
      date: new Date()
    }
    const oldPillHistory = pillHistory
    const newPillHitory = oldPillHistory.concat([pillSwallow])
    setPillHistory(newPillHitory)
    setPillTakerOpen(false)
  }

  const sortPills = (pillList: Pill[]) => {
    return pillList.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  const deletePill = (indexToDelete: number) => {
    const pillToTrash = pills[indexToDelete]
    const oldPillTrash = pillTrash
    const newPillTrash = sortPills(oldPillTrash.concat([pillToTrash]))
    setPillTrash(newPillTrash)
    const oldPills = pills
    const newPills = oldPills.filter((pill, index) => index !== indexToDelete)
    setPills(newPills)
  }

  const restorePill = (indexToRestore: number) => {
    const pillToRestore = pillTrash[indexToRestore]
    const oldPills = pills
    const newPills = sortPills(oldPills.concat([pillToRestore]))
    setPills(newPills)
    const oldPillTrash = pillTrash
    const newPillTrash = oldPillTrash.filter((pill, index) => index !== indexToRestore)
    setPillTrash(newPillTrash)
  }

  const emptyTrash = () => {
    Alert.alert(
      'Empty Trash',
      'Are you sure you want to empty your trash?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            setPillTrash([])
          }
        }
      ]
    );
  }

  const switchToPillAdder = () => {
    setPillManagerOpen(false)
    setPillTakerOpen(false)
    setTimeout(() => setPillAdderOpen(true), 200)
  }

  return (
    <SafeAreaView style={styles.app}>
      <TouchableOpacity style={[styles.box, styles.one, newStyle && styles.box2, newStyle && styles.one2]} onPress={() => setPillAdderOpen(true)}><Text style={styles.boxText}>Add a Pill</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.box, newStyle ? styles.three : styles.two, newStyle && styles.box2, newStyle && styles.two2]} onPress={() => setPillTakerOpen(true)}><Text style={styles.boxText}>Take a Pill</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.box, newStyle ? styles.two : styles.three, newStyle && styles.box2, newStyle && styles.three2]} onPress={() => setPillManagerOpen(true)}><Text style={styles.boxText}>Manage Pills</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.box, styles.four, newStyle && styles.box2, newStyle && styles.four2]} onPress={() => setPillHistoryOpen(true)}><Text style={styles.boxText}>Pill History</Text></TouchableOpacity>
      <PillModal isVisible={pillAdderOpen} closeWindow={() => setPillAdderOpen(false)} name={"Add a Pill"}>
        <PillAdder
          addPill={(name: string, dosage: number, unit: string) => addPill(name, dosage, unit)}
        />
      </PillModal>
      <PillModal isVisible={pillTakerOpen} closeWindow={() => setPillTakerOpen(false)} name={"Take a Pill"}>
        <PillTaker
          pills={pills}
          takePills={(session: Dose[]) => takePills(session)}
          switchToPillAdder={() => switchToPillAdder()}
        />
      </PillModal>
      <PillModal isVisible={pillManagerOpen} closeWindow={() => setPillManagerOpen(false)} name={"Manage Pills"}>
        <PillManager
          pills={pills}
          pillTrash={pillTrash}
          deletePill={(index: number) => deletePill(index)}
          restorePill={(index: number) => restorePill(index)}
          emptyTrash={() => emptyTrash()}
          switchToPillAdder={() => switchToPillAdder()}
        />
      </PillModal>
      <PillModal isVisible={pillHistoryOpen} closeWindow={() => setPillHistoryOpen(false)} name={"Pill History"}>
        <PillHistory
          pillHistory={pillHistory}
        />
      </PillModal>
      <TouchableOpacity style={styles.styleChanger} onPress={() => setNewStyle(!newStyle)}>
        <Text style={styles.styleChangerText}>Change Style</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    width: "100%",
    height: "100%"
  },
  box: {
    position: "absolute",
    width: "50%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid"
  },
  box2: {
    width: '100%',
    height: '25%',
    left: 0,
  },
  one2: {
    top: 0
  },
  two2: {
    top: '50%'
  },
  three2: {
    top: '25%'
  },
  four2: {
    top: '75%'
  },
  boxText: {
    color: "black",
    fontSize: 50,
    fontWeight: "500",
    textAlign: 'center',
    zIndex: -1,
  },
  one: {
    left: 0,
    top: 0,
    backgroundColor: "red"
  },
  two: {
    right: 0,
    top: 0,
    backgroundColor: "yellow"
  },
  three: {
    left: 0,
    bottom: 0,
    backgroundColor: "green"
  },
  four: {
    right: 0,
    bottom: 0,
    backgroundColor: "cornflowerblue"
  },
  styleChanger: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
  },
  styleChangerText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  }
});

export default App;
