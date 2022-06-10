import { useEffect, useState } from "react";
import LinkForm from './LinkForm';
import {db} from '../firebase'

import {toast} from 'react-toastify'
import LinkCard from "./LinkCard";

const Links = () => {

    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')

    const addOrEditLink = async (linkObject) =>{
        if (currentId === '' ){
            await db.collection('links').doc().set(linkObject)
            console.log('New task added succesfully')
            toast('New Link Added',{
                "type":"success"
            })
        }else{
            await db.collection('links').doc(currentId).update(linkObject)
            toast('Link Updated Succesfully',{
                "type":"info",
                "autoClose":1000,
            })
            setCurrentId('')
        }
    }

    const getLinks = async () =>{
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach(doc =>{
                console.log(doc.data())
                console.log(doc.id)
                docs.push({...doc.data(), id:doc.id});
            })
            // links del firebase
            setLinks(docs)
        })
    }

    useEffect(()=>{
        getLinks();
    },[])

    const onDeleteLink = async (idLink) =>{
        const confirm = window.confirm("Are you sure about this")
        
        if(confirm){
            await db.collection('links').doc(idLink).delete()
            toast('Link Removed Succesfully',{
                "type":"error",
                "autoClose":2000,
            })
        }
    }

    return ( 
        <div>
            <div className="col-md-4 p-2">
                <LinkForm {...{addOrEditLink, currentId, links} }/>
            </div>

            {/* cuando dan click al 'i' 
                se setea currentId, 
                con este seteo se 'renderiza' linkform again
                -> se renderiza de nuevo, o solo cambia su currentId
            */}

            <div className='col-md-8'>
                {links.map((link)=>(
                    <LinkCard link={link} onDeleteLink={onDeleteLink} setCurrentId={setCurrentId} />
                ))}
            </div>
        </div>
     );
}
 
export default Links;