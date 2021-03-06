import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

/*-----------------------------------------------------------------------*/
// Autor: ESI SoSe21 - Team sale & shipping
// University: University of Applied Science Offenburg
// Members: Tobias Gießler, Christoph Werner, Katarina Helbig, Aline Schaub
// Contact: ehelbig@stud.hs-offenburg.de, saline@stud.hs-offenburg.de,
//          cwerner@stud.hs-offenburg.de, tgiessle@stud.hs-offenburg.de
/*-----------------------------------------------------------------------*/

const columns = [
  { field: 'customerNo', headerName: 'Customer No.', width: 180, editable: false },
  { field: 'firstname', headerName: 'Firstname', width: 180, editable: true },
  { field: 'lastname', headerName: 'Lastname', width: 180, editable: true },
  { field: 'streetname', headerName: 'Streetname', width: 220, editable: true },
  { field: 'housenumber', headerName: 'Housenumber', type: 'number', width: 180, editable: true },
  { field: 'city', headerName: 'City', editable: true },
  { field: 'postcode', headerName: 'Postcode', type: 'number', width: 180, editable: true },
  { field: 'mailAddress', headerName: 'Mail-Address', width: 220, editable: true },
  { field: 'phoneNumber', headerName: 'Phone Number', type: 'number', width: 180, editable: true },
  { field: 'customerType', headerName: 'Customer Type', width: 180, editable: false },
];

const rows = [
  {
    id: 1,
    customerNo: 1,
    firstname: "Lena",
    lastname: "Müller",
    streetname: "Lange Straße",
    housenumber: 205,
    city: "Achern",
    postcode: 77865,
    mailAddress: "lena@web.de",
    phoneNumber: "01778263718",
    customerType: "P",
  },
  {
    id: 2,
    customerNo: 2,
    firstname: "Max",
    lastname: "Julius",
    streetname: "Straße",
    housenumber: 1,
    city: "Bremen",
    postcode: 44516,
    mailAddress: "max@web.de",
    phoneNumber: "0177898718",
    customerType: "P",
  },
];

const options = {
  textLabels: {
    body: {
      noMatch: "Es wurden keine passenden Aufträge gefunden.",
      toolTip: "Sort",
      columnHeaderTooltip: column => `Sort for ${column.label}`
    }
  }
};

export default function EditRowModelControlGrid() {
  const [editRowsModel, setEditRowsModel] = React.useState({});

  const handleEditRowModelChange = React.useCallback((params) => {
    setEditRowsModel(params.model);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editRowsModel={editRowsModel}
          onEditRowModelChange={handleEditRowModelChange}
          options={options}
        />
      </div>
    </div>
  );
}