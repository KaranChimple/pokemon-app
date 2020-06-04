import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { isEmpty, startCase } from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: 700,
    marginLeft: '5%'
  },
});

const TableRowHeaders = ['Abilities', 'Base Experience', 'Height', 'moves', 'Type(s)', 'Weight'];

const pokemonAttributesToBeMapped = ['abilities', 'base_experience', 'height', 'moves', 'types', 'weight'];

const attributeSubTypes = ['ability', '', '', 'move', 'type', ''];

const getAttributeValue = (attributeSubType, value) => {
  if (isEmpty(attributeSubType)) {
    return value;
  }
  else {
    const dataToBeSent = value.map(item => {
      return item[`${attributeSubType}`].name;
    })
    return dataToBeSent.join(', ');
  }
}

const CustomizedTables = ({ data }) => {
  const classes = useStyles();
  if (isEmpty(data)) return null;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Attributes Name</StyledTableCell>
            <StyledTableCell align="left">{startCase(data.name)}&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {pokemonAttributesToBeMapped.map((attribute, index) => (<StyledTableRow key={`${attribute}_${index}`}>
            <StyledTableCell align="left">
              {TableRowHeaders[index]}
            </StyledTableCell>
            <StyledTableCell align="left">
              {getAttributeValue(attributeSubTypes[index], data[attribute])}
            </StyledTableCell>

          </StyledTableRow>)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;