import React, { Fragment } from 'react';
import "./Table.css";


const data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
    {category: "Electric", price: "$9.99", stocked: true, name: "Cable"},
    {category: "Electric", price: "$2.99", stocked: false, name: "Socket"},
    {category: "Electric", price: "$5.99", stocked: true, name: "Plug"},
    {category: "Electric", price: "$8.99", stocked: true, name: "Lamp"},
  ];

function ProductRow(props) {
    const stocked = props.productStocked;
    const productNameClass = stocked ? "product-name" : "product-name-red";
    return (
        <div className="row">
            <div className={productNameClass}>{props.productName}</div>
            <div className="product-price">{props.productPrice}</div>
        </div>
    );
}

function ProductCategoryRow(props) {
    return (
        <div className="category-row">
            {props.category}
        </div>
    );
}

function ProductTable(props) {
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const table = [...data];
    const filteredTable = filterTable(table, filterText, inStockOnly);
    //filteredTable.map((v) => console.log("ProductTable.name: " + v.name));
    //console.log("Size:  " + filteredTable.length);  
    return (
        <div className="table">
            <div className="row">
                <div className="product-desc">Name</div>
                <div className="product-desc">Price</div>
            </div>
            <div>
                {filteredTable.map((v, i, tab) => {
                    if(i === 0) {
                        return (
                            <Fragment key={v.name} >
                                <ProductCategoryRow category={v.category} />
                                <ProductRow productName={v.name} productPrice={v.price} productStocked={v.stocked} />
                            </Fragment>
                        );
                    } else if (i > 0 && (v.category !== tab[i - 1].category)) {
                        return (
                            <Fragment key={v.name} >
                                <ProductCategoryRow category={v.category} />
                                <ProductRow productName={v.name} productPrice={v.price} productStocked={v.stocked} />
                            </Fragment>
                        );
                    } else {
                        return (
                            <Fragment key={v.name} >
                                <ProductRow productName={v.name} productPrice={v.price} productStocked={v.stocked} />
                            </Fragment>
                        );
                    }
                })}
            </div>
        </div>
    );
}

function SearchBar(props) {
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    //console.log("SearchBar: " + inStockOnly + ",  " + filterText);
    return (
        <div className="search">
            <div className="search-bar">
                <input
                    id="search-bar-input" 
                    className="search-bar-input" 
                    type="text" 
                    placeholder="Search..." 
                    value={filterText}
                    onChange={props.onChangeFilterText}
                />
            </div>
            <div className="search-box">
                <input 
                    type="checkbox"
                    id="in-stock-only"
                    checked={inStockOnly}
                    onChange={props.onChangeInStockOnly}
                />
                <label htmlFor="in-stock-only" >Only show products in stock</label>
            </div>

        </div>
    );
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inStockOnly: false,
            filterText: "",
        }
        this.handleFilterText = this.handleFilterText.bind(this);
        this.handleInStockOnly = this.handleInStockOnly.bind(this);
    }

    handleFilterText(e) {
        this.setState({
            filterText: e.target.value,
        });
    }

    handleInStockOnly(e) {
        this.setState({
            inStockOnly: e.target.checked,
        });
    }

    render() {
        const inStockOnly = this.state.inStockOnly;
        const filterText = this.state.filterText;
        return(
            <div className="main">
                <SearchBar 
                    inStockOnly={inStockOnly} 
                    filterText={filterText}
                    onChangeFilterText={this.handleFilterText}
                    onChangeInStockOnly={this.handleInStockOnly}
                />
                <ProductTable 
                    inStockOnly={inStockOnly} 
                    filterText={filterText}
                />
            </div>
        );
    }
}

export default FilterableProductTable;

/*
function filterTable(table, filterText, inStockOnly) {
    const path = new RegExp(filterText, "i");
    let newTable = table.slice();
    let stockTable = [];
    let returnTable = [];
    if(inStockOnly) {
     newTable.map((value) => {
         return (stockTable = value.stocked ? 
        stockTable.concat(value) : 
        stockTable);
         });
    } else {
        stockTable = newTable;
    }
    stockTable.map((value, index) => {
        return (returnTable = path.test(value.name) ? 
            returnTable.concat(value) :
            returnTable);
    });
    console.log("newTable: " + newTable);
    console.log("stockTable: " + stockTable + ", inStock: " + inStockOnly);
    console.log("returnTable: " + returnTable);
    return returnTable.slice();  
}*/

function filterTable(table, filterText, inStockOnly) {
    const path = new RegExp(filterText, "i");
    let newTable = table.slice();
    if(inStockOnly) {
        newTable = newTable.filter(value => value.stocked); 
    }
    newTable = newTable.filter(value => path.test(value.name));
    return newTable.slice();
}

