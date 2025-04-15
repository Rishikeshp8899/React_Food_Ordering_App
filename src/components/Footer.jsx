import React from 'react'
import '../css/footer.css';
export default function footer() {
  return (

    <footer>
        <div style={{left: 0}} className="footer1">
          <div className="fotrow">
            <div className="fotcol">
              <h3 style={{color: 'black', textAlign:'center'}}>Are you lovin' it?</h3>
              <h4 style={{color: 'gold', textAlign:'center'}}> FOLLOW US| 
              <a href="#" >facebook</a>\<a href="#">Instagram</a> \  <a href="#">  twitter</a></h4>
            </div>
            <div className="fotcol">
              <h3 style={{color: 'black', textAlign:'center'}}>DOWNLOAD APP</h3> 
              <h4 style={{color: 'gold', textAlign:'center'}}> <a href="#"> Play Store</a>\<a href="#"> App Store</a> </h4> 
            </div>
            <hr />
          </div>
         <h4 style={{color:'goldenrod', backgroundColor: '#141414',textAlign:'center'}}>  richim©2025 </h4>
        </div>
        
         
      </footer>

  );
}

