import { useState, useEffect } from "react";
import { db } from "../firebase";

const LinkForm = ({addOrEditLink, currentId, links}) => {

    const initialForm = {
        url: '',
        name: '',
        description: '',
    }

    const [values, setValues] = useState(initialForm)

    const handleSubmit = (e) =>{
        e.preventDefault()
        addOrEditLink(values)
        setValues(initialForm)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]:value})
        // copia lo actual, y actualize con el del input
    }

    const getLinkById = async(id) =>{
        const doc = await db.collection('links').doc(id).get()
        setValues({...doc.data()})
        // setValues(doc.data())
        // copiar en doc cata...
    }

    useEffect(() =>{
        if(currentId===''){
            setValues({initialForm})
            console.log('id vacio')
        }else{
            getLinkById(currentId)
            console.log('id usado')
        }
    }, [currentId])

    return ( 
        <form className='card card-body border-primary' onSubmit={handleSubmit} >
            <div className='form-group input-group'>
                <div className='input-group-text bg-light'>
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='https://someurl.com'
                    name='url'
                    onChange={handleChange}
                    value={values.url}
                />
            </div>

            <div className='form-group input-group'>
                <div className='input-group-text bg-light'>
                    <i className="material-icons">create</i>
                </div>
                <input
                    type='text'
                    className='form-control'
                    placeholder='website'
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                />
            </div>

            <div className='form-group'>
                <textarea 
                    name='description' 
                    rows='3' 
                    className='form-control' 
                    placeholder='write a description'
                    onChange={handleChange}
                    value={values.description}
                />
            </div>

            <button 
                type='submit' 
                className='btn btn-primary btn-block' 
                >
                    {currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
     );
}
 
export default LinkForm;
