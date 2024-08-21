/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import PillAdder from './public/components/PillAdder'
import PillTaker from './public/components/PillTaker'
import PillManager from './public/components/PillManager'
import PillHistory from './public/components/PillHistory'
import PillModal from './public/components/PillModal';
// import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
// const storage = new MMKVLoader().initialize();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type Pill = {
  name: string;
  dosage: number;
  unit: string;
}

type PillSwallow = {
  dose: Dose;
  date: Date;
}

type SessionDate = {
  date: Date;
  session: Dose[];
}

type Dose = {
  pill: Pill;
  quantity: number;
}

function App(): React.JSX.Element {
  // const [pills, setPills] = useMMKVStorage<Pill[]>('pills', storage, [])
  const [pills, setPills] = useState<Pill[]>([])
  const [pillAdderOpen, setPillAdderOpen] = useState(false)
  const [pillManagerOpen, setPillManagerOpen] = useState(false)
  const [pillTakerOpen, setPillTakerOpen] = useState(false)
  const [pillHistoryOpen, setPillHistoryOpen] = useState(false)
  const [pillHistory, setPillHistory] = useState<SessionDate[]>([])

  const addPill = (name: string, dosage : number, unit : string) => {
    const pill = {
      name: name,
      dosage: dosage,
      unit: unit
    }
    const oldPills = pills
    const newPills = oldPills.concat([pill])
    setPills(newPills)
    setPillAdderOpen(false)
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

  const deletePill = (indexToDelete: number) => {
    const oldPills = pills
    const newPills = oldPills.filter((pill, index) => index !== indexToDelete)
    setPills(newPills)
  }

  return (
    <SafeAreaView style={styles.app}>
      <TouchableHighlight style={[styles.box, styles.one]} onPress={() => setPillAdderOpen(true)}><Text style={styles.boxText}>Add a Pill</Text></TouchableHighlight>
      <TouchableHighlight style={[styles.box, styles.two]} onPress={() => setPillTakerOpen(true)}><Text style={styles.boxText}>Take a Pill</Text></TouchableHighlight>
      <TouchableHighlight style={[styles.box, styles.three]} onPress={() => setPillManagerOpen(true)}><Text style={styles.boxText}>Manage Pills</Text></TouchableHighlight>
      <TouchableHighlight style={[styles.box, styles.four]} onPress={() => setPillHistoryOpen(true)}><Text style={styles.boxText}>Pill History</Text></TouchableHighlight>
      <PillModal isVisible={pillAdderOpen} closeWindow={() => setPillAdderOpen(false)} name={"Add a Pill"}>
        <PillAdder
          addPill={(name: string, dosage: number, unit: string) => addPill(name, dosage, unit)}
        />
      </PillModal>
      <PillModal isVisible={pillTakerOpen} closeWindow={() => setPillTakerOpen(false)} name={"Take a Pill"}>
        <PillTaker
          pills={pills}
          takePills={(session: Dose[]) => takePills(session)}
        />
      </PillModal>
      <PillModal isVisible={pillManagerOpen} closeWindow={() => setPillManagerOpen(false)} name={"Manage Pills"}>
        <PillManager
          pills={pills}
          deletePill={(index: number) => deletePill(index)}
        />
      </PillModal>
      <PillModal isVisible={pillHistoryOpen} closeWindow={() => setPillHistoryOpen(false)} name={"Pill History"}>
        <PillHistory
          pillHistory={pillHistory}
        />
      </PillModal>
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
    backgroundColor: "blue"
  }
});

export default App;
