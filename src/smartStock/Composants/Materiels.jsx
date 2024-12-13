import React from 'react'
import { FaPencilAlt, FaTrash, FaTrashAlt } from 'react-icons/fa'

function Materiels() {
    return (
        <div className='row'>

            <div className='col-lg-4'>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "48vh", padding: "20px" }}>
                    <img src="" alt="" style={{width:"100%", height:"150px", objectFit:"cover"}} />
                   
                   <h6>Titre produit</h6>

                   <div style={{display:"flex", justifyContent:"space-between"}}>
                   <div> <span>Stock : </span> <span>89</span></div>
                   <div>
                    <FaPencilAlt style={{color:"blue", marginRight:"30px"}}/>
                    <FaTrashAlt style={{color:"red"}}/>
                   </div>
                   </div>
                   <div style={{marginTop:"10px"}}>
                    <span>Etat : </span>
                    <span style={{backgroundColor:"seagreen", color:"white", textAlign:"center", padding:"4px 12px", borderRadius:"10px"}}>Bon</span>
                   </div>
                   <div style={{marginTop:"15px"}}>
                    <span>Commentaire</span>
                    <div style={{fontSize:"14px", color:"#666"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veniam nisi facere autem nesciunt voluptas? </div>
                   </div>
                </div>
            </div>

            <div className='col-lg-4'>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "48vh", padding: "20px" }}>
                    <img src="" alt="" style={{width:"100%", height:"150px", objectFit:"cover"}} />
                   
                   <h6>Titre produit 2</h6>

                   <div style={{display:"flex", justifyContent:"space-between"}}>
                   <div> <span>Stock : </span> <span>153</span></div>
                   <div>
                    <FaPencilAlt style={{color:"blue", marginRight:"30px"}}/>
                    <FaTrashAlt style={{color:"red"}}/>
                   </div>
                   </div>
                   <div style={{marginTop:"10px"}}>
                    <span>Etat : </span>
                    <span style={{backgroundColor:"seagreen", color:"white", textAlign:"center", padding:"4px 12px", borderRadius:"10px"}}>Bon</span>
                   </div>
                   <div style={{marginTop:"15px"}}>
                    <span>Commentaire</span>
                    <div style={{fontSize:"14px", color:"#666"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veniam nisi facere autem nesciunt voluptas? </div>
                   </div>
                </div>
            </div>

            <div className='col-lg-4'>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "48vh", padding: "20px", marginTop:"10px" }}>
                    <img src="" alt="" style={{width:"100%", height:"150px", objectFit:"cover"}} />
                   
                   <h6>Titre produit 3</h6>

                   <div style={{display:"flex", justifyContent:"space-between"}}>
                   <div> <span>Stock : </span> <span>9</span></div>
                   <div>
                    <FaPencilAlt style={{color:"blue", marginRight:"30px"}}/>
                    <FaTrashAlt style={{color:"red"}}/>
                   </div>
                   </div>
                   <div style={{marginTop:"10px"}}>
                    <span>Etat : </span>
                    <span style={{backgroundColor:"orange", color:"white", textAlign:"center", padding:"4px 12px", borderRadius:"10px"}}>Faible</span>
                   </div>
                   <div style={{marginTop:"15px"}}>
                    <span>Commentaire</span>
                    <div style={{fontSize:"14px", color:"#666"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veniam nisi facere autem nesciunt voluptas? </div>
                   </div>
                </div>
            </div>


            <div className='col-lg-4'>
                <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "48vh", padding: "20px" }}>
                    <img src="" alt="" style={{width:"100%", height:"150px", objectFit:"cover"}} />
                   
                   <h6>Titre produit 4</h6>

                   <div style={{display:"flex", justifyContent:"space-between"}}>
                   <div> <span>Stock : </span> <span>1</span></div>
                   <div>
                    <FaPencilAlt style={{color:"blue", marginRight:"30px"}}/>
                    <FaTrashAlt style={{color:"red"}}/>
                   </div>
                   </div>
                   <div style={{marginTop:"10px"}}>
                    <span>Etat : </span>
                    <span style={{backgroundColor:"red", color:"white", textAlign:"center", padding:"4px 12px", borderRadius:"10px"}}>Faible</span>
                   </div>
                   <div style={{marginTop:"15px"}}>
                    <span>Commentaire</span>
                    <div style={{fontSize:"14px", color:"#666"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque veniam nisi facere autem nesciunt voluptas? </div>
                   </div>
                </div>
            </div>

        </div>
    )
}

export default Materiels
