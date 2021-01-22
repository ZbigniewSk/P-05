import React from "react";

function Fibo(size) {
    let tab = [1, 1];
    for(let i = 0; i < size; i++) {
        tab.push(tab[i] + tab[i+1]);
    }
    return tab;
}

function Loopy(props) {
     const fibo = Fibo(props.size);
    console.log(fibo);

     const Items = fibo.map((value, index) => <li key={index.toString()}>{value}</li>);
        
    return(
        <ol>{Items}</ol>
    );
}

export default Loopy;