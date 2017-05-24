import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class PortfolioTable extends Component {

    renderTableRow = (cryptoAsset, index) => {
        return (
            <Table.Row key={index}>
                <Table.Cell>{cryptoAsset.symbol}</Table.Cell>
                <Table.Cell>{cryptoAsset.name}</Table.Cell>
                <Table.Cell>{cryptoAsset.units}</Table.Cell>
                <Table.Cell>${((cryptoAsset.units * cryptoAsset.unit_price_usd) - cryptoAsset.purchase_usd).toFixed(2)}</Table.Cell>
                <Table.Cell>${(cryptoAsset.units * cryptoAsset.unit_price_usd).toFixed(2)}</Table.Cell>
            </Table.Row>
        );
    }

    render() {

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Symbol</Table.HeaderCell>
                    <Table.HeaderCell>Currency</Table.HeaderCell>
                    <Table.HeaderCell>Units</Table.HeaderCell>
                    <Table.HeaderCell>Change (USD)</Table.HeaderCell>
                    <Table.HeaderCell>Total (USD)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.portfolioData.map((cryptoAsset, index) => {
                        return this.renderTableRow(cryptoAsset, index);
                    })}
                </Table.Body>
            </Table>
        );
    }
}

export default PortfolioTable;