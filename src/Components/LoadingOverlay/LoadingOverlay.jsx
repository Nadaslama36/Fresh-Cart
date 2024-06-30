import React from 'react'
import { FallingLines } from 'react-loader-spinner'
export default function LoadingOverlay() {
  return<>
  
  <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
             <div>
            <FallingLines
              color="#fff"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          </div> 
        </div>
  
  
  
  
  
  
  </>
}
