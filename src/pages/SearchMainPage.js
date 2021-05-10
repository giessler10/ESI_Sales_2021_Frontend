import React from 'react';
import Typography from '@material-ui/core/Typography';

//Seiteninhalte importieren
import SearchForm from '../components/SearchForm';
import SearchTable from '../components/SearchTable'
const Search = () => {
    return (
<div>
    <SearchForm />

    <SearchTable />

    </div>
    )
}

export default Search