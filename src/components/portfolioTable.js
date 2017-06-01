import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class PortfolioTable extends Component {

    renderTableRow = (cryptoAsset, index) => {
        let profit = (cryptoAsset.units * cryptoAsset.unit_price_usd) - cryptoAsset.purchase_usd;
        return (
            <Table.Row key={index}>
                <Table.Cell>{cryptoAsset.symbol}</Table.Cell>
                <Table.Cell>{cryptoAsset.units}</Table.Cell>
                <Table.Cell>${Number(cryptoAsset.unit_price_usd).toFixed(2)}</Table.Cell> 
                <Table.Cell>${(cryptoAsset.units * cryptoAsset.unit_price_usd).toFixed(2)}</Table.Cell>
                <Table.Cell>${(profit).toFixed(2)}</Table.Cell>
                <Table.Cell>{(profit / (cryptoAsset.weight * 10)).toFixed(2)}%</Table.Cell>
            </Table.Row>
        );
    }

    render() {

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Symbol</Table.HeaderCell>
                    <Table.HeaderCell>Units</Table.HeaderCell>
                    <Table.HeaderCell>$ / Unit</Table.HeaderCell>
                    <Table.HeaderCell>Total $</Table.HeaderCell>
                    <Table.HeaderCell>Profit</Table.HeaderCell>
                    <Table.HeaderCell>Increase %</Table.HeaderCell>

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