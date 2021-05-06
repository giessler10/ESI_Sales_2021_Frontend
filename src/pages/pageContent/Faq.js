import React from 'react';
import Faq from 'react-faq-component';
export default function FaqBereich() {
    const data = {
        title: "FAQ",
        rows: [
          {
            
            title: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
            content: ", sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            
          },
          {
            title: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
            content: ", sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          },
          {
            title: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
            content: ", sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
          },
          {
            title: "What is the package version?",
            content: "V.XX.XX.X"
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