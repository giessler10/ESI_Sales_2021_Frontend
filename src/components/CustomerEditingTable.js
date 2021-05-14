import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

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
        />
      </div>
    </div>
  );
}

const columns = [
  {field: 'customerNo', headerName: 'Customer No.', width: 180, editable: true },
  {field: 'firstname', headerName: 'Firstname', type: 'number', editable: true },
  {field: 'lastname', headerName: 'Lastname', type: 'date', width: 180, editable: true},
  {field: 'streetname', headerName: 'Streetname', type: 'dateTime', width: 220, editable: true},
  {field: 'housenumber', headerName: 'Housenumber', width: 180, editable: true },
  {field: 'city', headerName: 'City', type: 'number', editable: true },
  {field: 'postcode', headerName: 'Postcode', type: 'date', width: 180, editable: true},
  {field: 'mailAddress', headerName: 'Mail-Address', type: 'dateTime', width: 220, editable: true},
  {field: 'phoneNumber', headerName: 'Phone Number', type: 'number', editable: true },
  {field: 'customerType', headerName: 'Customer Type', type: 'date', width: 180, editable: true},
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