
const LinkCard = ({link, onDeleteLink, setCurrentId}) => {

    return ( 
        <div key={link.id} className="card mb-1">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4>{link.name}</h4>
                    <div>
                        <i className='material-icons text-danger' 
                            onClick={() => onDeleteLink(link.id)}>
                            close
                        </i>
                        <i className='material-icons text-succes' 
                            onClick={ () => setCurrentId(link.id)}>
                            create
                        </i>
                    </div>
                </div>
                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noreferrer">
                    Go to website
                </a>
            </div>
        </div>
     );
}
export default LinkCard;