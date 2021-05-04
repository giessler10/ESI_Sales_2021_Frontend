import React from 'react';
import Faq from 'react-faq-component';
export default function FaqBereich() {
    const data = {
        title: "FAQ",
        rows: [
          {
            title: "Wie kann ich eine CSV-Datei mit den geplanten Produktionsaufträge für die Maschine erstellen?",
            content: "Im Tab 'Planung' kann über den Button 'CSV erzeugen' eine CSV-Datei für die Maschine erstellt werden."
            
          },
          {
            title: "Wie lassen sich Produktionsaufträge als produziert kennzeichnen?",
            content: "Im Tab Produktion lassen sich die einzelnen Positionen auswählen und können über den Button 'Produziert' als produziert kennzeichnen lassen."
          },
          {
            title: "Curabitur laoreet, mauris vel blandit fringilla",
            content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc"
          },
          {
            title: "What is the package version?",
            content: "v1.0.5"
          }]
      }
      const styles = {
        bgColor: 'black',
        titleTextColor: "white",
        rowTitleColor: "white",
        rowContentColor: 'white',
        arrowColor: "white",
    };
    const config = {
        animate: true,
      // arrowIcon: "V",
        tabFocus: true
    };
    
  return (
          <div style={{ padding: '20px'}}>
            <Faq data={data} styles={styles} config={config} />
          </div>
  );}