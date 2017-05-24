import React, { Component } from 'react';
import './app.css';
import { Grid, Label, Header } from 'semantic-ui-react';
import PortfolioTable from './components/portfolioTable';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			portfolioData: []
		}
	}

	componentDidMount() {

		let userPortfolio = [
            {
                symbol: 'BTC',
                name: 'Bitcoin',
                units: 0.3295,
                purchase_usd: 300,
                unit_price_usd: 0 
            },
            {
                symbol: 'ETH',
                name: 'Ether',
                units: 29.49,
                purchase_usd: 300,
                unit_price_usd: 0
            },
            {
                symbol: 'XMR',
                name: 'Monero',
                units: 21.15,
                purchase_usd: 300,
                unit_price_usd: 0
            },
            {
                symbol: 'REP',
                name: 'Augur',
                units: 11.03,
                purchase_usd: 50,
                unit_price_usd: 0
            },
            {
                symbol: 'DGD',
                name: 'DigixDAO',
                units: 5.66,
                purchase_usd: 50,
                unit_price_usd: 0
            }
        ];

		this.fetchCurrentPrices(userPortfolio);
	}

	fetchCurrentPrices = (userPortfolio) => {

		const API_URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=50';
		// let headers = new Headers();
		// headers.set('Content-Type', 'application/json');

		fetch(API_URL)
			.then(res => res.json())
			.then((tickerData) => {
				this.updatePortfolioData(userPortfolio, tickerData);
			})
			.catch(err => console.error(err));
	}

	updatePortfolioData = (userPortfolio, tickerData) => {
		let portfolioData = [];

		let relevantSymbols = userPortfolio.map((cryptoAsset => cryptoAsset.symbol));
		let relevantTickerData = tickerData
			.filter((tickerItem) => {
				let indexOf = relevantSymbols.indexOf(tickerItem.symbol);
				return indexOf !==  -1;
			});
		
		portfolioData = userPortfolio
			.map((cryptoAsset) => {
				let latestAsset = relevantTickerData.find((tickerItem) => { 
					return tickerItem.symbol === cryptoAsset.symbol; 
				});
				return ({
					...cryptoAsset,
					unit_price_usd: latestAsset.price_usd
				});
			});

		this.setState({portfolioData})
	}

	calculatePortfolioTotalValue = (portfolioData) => {
		if (portfolioData.length > 0) {
			let totalUSD = portfolioData
				.map((asset) => {
					return (asset.units * asset.unit_price_usd);	
				})
				.reduce((acc, assetTotal) => {
					return acc + assetTotal;
				});
			return totalUSD.toFixed(2);
		} else {
			return "-";
		}
	}

	render() {

		let totalValue = this.calculatePortfolioTotalValue(this.state.portfolioData);
		let percentageChange = (((totalValue - 1000) / 1000) * 100).toFixed(2);
		
		return (
			<Grid container width={16} className="app-container">
				<div className="App-intro">
					<Header as='h3'>
					The value of this portfolio on Jan 1st, 2017 was <Label>$1000</Label>. The current value of this portfolio is <Label>${totalValue} ({percentageChange}%)</Label>.
					</Header>
				</div>
				<Grid.Row>
					<Grid.Column>
						<PortfolioTable portfolioData={this.state.portfolioData}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default App;
