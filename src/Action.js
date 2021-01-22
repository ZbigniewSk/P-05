import React from 'react';

function ActionLink() {
    function handleClick(e) {    
        e.preventDefault();    
        console.log('Kliknięto w link.');  
    }
    return (
      <a href="#" onClick={handleClick}>      Kliknij mnie
      </a>
    );
  }

  export default ActionLink;