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
  View,
} from 'react-native';
import PillAdder from './components/PillAdder'
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

function App(): React.JSX.Element {
  // const [pills, setPills] = useMMKVStorage<Pill[]>('pills', storage, [])
  const [pills, setPills] = useState<Pill[]>([])
  const [pillAdderOpen, setPillAdderOpen] = useState(false)

  const addPill = (name: string, dosage : number, unit : string) => {
    const pill = {
      name: name,
      dosage: dosage,
      unit: unit
    }
    const oldPills = pills
    const newPills = oldPills.concat([pill])
    setPills(newPills)
  }

  return (
    <SafeAreaView style={styles.app}>
      <Button title="Add Pill" onPress={() => setPillAdderOpen(!pillAdderOpen)}>
      </Button>
      <View style={styles.pillHistory}>
        {pills.map((pill) => {
          return <Text>{pill.name}, {pill.dosage}, {pill.unit}</Text>
        })}
      </View>
      <PillAdder
        isVisible={pillAdderOpen}
        addPill={(name: string, dosage: number, unit: string) => addPill(name, dosage, unit)}
        closeWindow={() => setPillAdderOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    width: "100%",
    height: "100%"
  },
  pillHistory: {

  }
});

export default App;
