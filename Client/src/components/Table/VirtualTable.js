import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            ...(theme.direction === 'rtl' && {
                paddingLeft: '0 !important',
            }),
            ...(theme.direction !== 'rtl' && {
                paddingRight: undefined,
            }),
        },
    },
    tableRow: {
        cursor: 'pointer',
        width: '100%'
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        width: '100%',
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;
        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick, address } = this.props;
        console.log('cell data: ', cellData, ' c i : ', columnIndex)
        columnIndex === 2 && cellData === address
            ? console.log('add', cellData)
            : console.log('subtract ', cellData);
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{
                    height: rowHeight,
                    color: '#FFF',
                    justifyContent: 'center',
                    width: 'fit-content',
                }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex, width }) => {
        const { headerHeight, columns, classes } = this.props;
        const headerWidth = width / columns.length

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{
                    height: headerHeight,
                    color: '#FFF',
                    width: `${headerWidth}px`,
                    justifyContent: 'center'
                }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                            paddingRight: '5px',
                            paddingLeft: '5px'
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    style={{ width: '100%' }}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                            width: width
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

// ---------------------------------------------------------------------------------

export default function ReactVirtualizedTable(history, address) {

    const rows = [];
    const createData = (id, quantity, value, from, to, gas, hash) => {
        return { id, quantity, value, from, to, gas, hash };
    }
    if (history.history) {
        for (let i = 0; i < history.history.length; i++) {
            const row = history.history[i];
            rows.push(createData(i, ...row));
        }
    }

    const containerStyles = {
        height: 400,
        width: '100%',
        marginTop: '32px',
        background: '#1e1f26'
    }

    return (
        <Paper style={containerStyles}>
            <VirtualizedTable
                address={address}
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                    {
                        label: 'Quantity',
                        dataKey: 'quantity',
                    },
                    {
                        label: 'Value',
                        dataKey: 'value',
                    },
                    {
                        label: 'From',
                        dataKey: 'from',
                    },
                    {
                        label: 'To',
                        dataKey: 'to',
                    },
                    {
                        label: 'Gas',
                        dataKey: 'gas',
                    },
                    {
                        label: 'Hash',
                        dataKey: 'hash',
                    },
                ]}
            />
        </Paper>
    );
}