import React from 'react';
import Faq from 'react-faq-component';

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/



export default function FaqBereich() {

    const data = { 
        
        title: "FAQ",
        rows: [
          {
            title: "Besitzen Aufträge, die ich in die Produktion zur Vorproduktion gebe, ebenfalls eine Auftragsnummer? Bzw. kann ich diese irgendwo einsehen?",
            content: "Nein, Aufträge zur Vorproduktion, werden unter interne Aufträge gebucht und besitzen keine eigene Auftragsnummer. Sobald du eine Vorproduktion anstößt, ist sie für dich im Verkauf & Versand nicht mehr einsehbar. Das ist aber auch gar nicht weiter schlimm. Deine Kollegen in der Produktion kümmern sich um alles Weitere."
            
          },
          {
          title: "Der Kunde nennt mir seine gewünschte Farbe. Ich habe aber keine Ahnung, welchem Farbcode diese entsprcht. Wie gehe ich vor?",
          content: "Beim Erfassen eines neuen Auftrages, werden dir in einer Tabelle einzelne Farben mit zugehörigem Farbwert zur Hilfestellung gegeben. Diese entsprechen den meist bestellten Farben und du kannst deren Farbwert ganz einfach in das gewünschte Feld kopieren. Ist deine gesuchte Farbe nicht dabei empfehlen wir dir bei bereits abgeschlossenen Aufträgen deines Kundens die stets bestellte Farbe einzusehen. Falls diese nicht der gewünschten Farbe entspricht, nutze das firmeninterne Intranet, dort gibt es einen Hex-Colorpicker."
          },
          {
            title: "Ich habe soeben einen Auftrag entgegengenommen und gespeichert. Nun ist mir jedoch aufgefallen, dass keine Verbindung zur Datenbank gegeben war. Was bedeuted dies? Ist der Auftrag verloren?",
            content: "Keine Panik - der Auftrag ist noch da. Erstmals als Entwurf gespeichert und sobald er an die Produktion gegangen ist, unter 'Aufträge in Bearbeitung' zu finden."
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
        tabFocus: true
    };
    
  return (
          <div style={{ padding: '20px', alignContent:"left", justifyContent: 'left'}}>
            <Faq data={data} styles={styles} config={config} />
          </div>
  );}