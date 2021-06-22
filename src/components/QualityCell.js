import React, {Component} from "react";
import PropTypes from "prop-types";

/*-----------------------------------------------------------------------*/
  // Autor: ESI SoSe21 - Team sale & shipping
  // University: University of Applied Science Offenburg
  // Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
  // Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
  //          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
  /*-----------------------------------------------------------------------*/


class QualityCell extends Component {
    static propTypes = {
      value: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      change: PropTypes.func.isRequired
    };
  
    render() {
      const { value, index, change } = this.props;
      let backgroundColor = String(value);      
  
      return (
        <p
          value={value}
          onChange={event => change(event.target.value, index)}
          style={{ backgroundColor: backgroundColor, color: value}}>{"."}</p>
          
      )
    }
  }
  export default QualityCell;