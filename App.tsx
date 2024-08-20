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
  const [pills, setPills] = useState([])
  const [pillAdderOpen, setPillAdderOpen] = useState(false)
  return (
    <SafeAreaView style={styles.app}>
      <Button title="Add Pill" onPress={() => setPillAdderOpen(!pillAdderOpen)}>

      </Button>
      <PillAdder
        isVisible={pillAdderOpen}
        addPill={(name: string, dosage: number, unit: string) => console.log(name, dosage, unit)}
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
