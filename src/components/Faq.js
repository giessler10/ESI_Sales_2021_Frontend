import React from 'react';
import Faq from 'react-faq-component';
import Typography from '@material-ui/core/Typography';

export default function FaqBereich() {
    const data = {
        title: "FAQ",
        rows: [
          {
            
            title: "Der Kunde möchte seinen Auftrag änden, ich habe ihn jedoch schon in die Produktion gegeben. Was jetzt?",
            content: "Leider zu spät."
            
          },
          {
            title: "In der Qualitätsprüfung des Auftrages sind minimale Mängel festgestellt worden. Gebe ich den Auftrag an den Versanddienstleister weiter?",
            content: "Nein, Qualität steht bei uns an erster Stelle. Wähle unter 'Versandbereite Aufträge' den Auftrag aus, wähle 'QS' an und fülle das Formular aus. Ein neuer Auftrag wird in der Produktion angestoßen."
          },
          {
            title: "Der Kunde reklamiert einzelne Positionen seines Auftrages. Lege ich nun einen komplett neuen Auftrag an?",
            content: "Nein, es muss kein neuer Auftrag angelegt werden. Gehe unter 'Geschlossene Aufträge' und wähle den Auftrag, welcher der Kunde reklamiert. Wähle die einzelnen Positionen und entsprechenden Gründe aus und lege die Beanstandung an. Dein Job ist in erster Linie getan."
          },
          {
            title: "Ab welchem Gewicht muss ich die Ware in einen seperaten Versandkarton packen?",
            content : "Das Gewicht des Paketes darf 32 Kilogramm nicht überschreiten. Lieber ein Mal mehr wiegen."
          }]
      }
      const styles = {
        titleTextColor: "#006064",
        rowTitleColor: "#006064",
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