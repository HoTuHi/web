import Users, {addUser, deleteUser, getAllUser, randomDate, updateUser, User} from './User'
import {useEffect, useState} from "react";
import Modal from './Component/Modal'

function UserManager() {
    const dfUser = new User({
        name: "Default",
        dateOfBirth: randomDate(new Date(2012, 0, 1), new Date()),
        phoneNumber: "0912 333 444",
        address: "Default",
        class: "A"
    })
    const [modal, setModal] = useState(false)
    const [updateFlag, setUpdateFlag] = useState(-1)
    const [Users, setUsers] = useState([])
    const [newUser, setNewUser] = useState(dfUser)
    const handleClick = () => {
        if (updateFlag !== -1) {
            console.log(Users[updateFlag])
        } else setNewUser(prevState => ({...dfUser}))
        setModal(!modal)
    }
    const handleSubmit = () => {
        addUser(newUser).then(r => alert("Add Student Successfully!"))
        window.location.reload()
    }
    useEffect(() => {
        getAllUser().then((data) => setUsers(JSON.parse(data)))
    }, [])
    const handleDelete = (index) => {
        deleteUser(index).then(r => r.HTTP_STATUS_OK ? console.log("oke") : console.log("not oke"))
        window.location.reload()
    }
    const handleUpdate = (index) => {
        updateUser(Users[index]).then(r => r.HTTP_STATUS_OK ? console.log("oke") : console.log("not oke"))
        alert("Update Student Successfully!")
        handleClick()
        // window.location.reload()
    }
    // console.log(Users)

    // console.log(newUser)
    return <div className="container mt-6 is-block">
        <div className="button is-primary" onClick={() => handleClick()}>
            Create
        </div>
        <div className={modal ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Create New Student</p>
                    <button className="delete" aria-label="close" onClick={() => handleClick()}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input onChange={(e) => setNewUser(prevState => ({...prevState, name: e.target.value}))}
                                   className="input" type="text" placeholder="Text input" value={newUser.name}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Date Of Birth</label>
                        <div className="control">
                            <input className="input" onChange={(e) => setNewUser(prevState => ({
                                ...prevState,
                                dateOfBirth: e.target.value
                            }))} type="date" data-display-mode="inline" data-is-range="true"
                                   data-close-on-select="false"/>

                        </div>

                    </div>
                    <div className="field">
                        <label className="label">Phone Number</label>
                        <div className="control ">
                            <input
                                onChange={(e) => setNewUser(prevState => ({...prevState, phoneNumber: e.target.value}))}
                                className="input " type="phone" placeholder="Phone input" value={newUser.phoneNumber}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input onChange={(e) => setNewUser(prevState => ({...prevState, address: e.target.value}))}
                                   className="input is-success" type="text" placeholder="Text input"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Subject</label>
                        <div className="control">
                            <div className="select">
                                <select
                                    onChange={(e) => setNewUser(prevState => ({...prevState, class: e.target.value}))}>
                                    {newUser.class === 'A' ? <option selected>A</option> : <option>A</option>}
                                    {newUser.class === 'B' ? <option selected>B</option> : <option>B</option>}
                                    {newUser.class === 'C' ? <option selected>C</option> : <option>C</option>}
                                    {newUser.class === 'D' ? <option selected>D</option> : <option>D</option>}
                                    {newUser.class === 'E' ? <option selected>E</option> : <option>E</option>}
                                </select>
                            </div>
                        </div>
                    </div>


                </section>
                <footer className="modal-card-foot">
                    <button onClick={() => updateFlag !== -1 ? handleUpdate(updateFlag) : handleSubmit()}
                            className="button is-success">{updateFlag !== -1 ? "update" : "Save"}</button>
                </footer>
            </div>
        </div>
        <div className="section is-flex is-align-content-end is-align-self-center">
            <div>Show</div>
            <div className="dropdown ">
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Dropdown button</span>
                        <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <a href="#" className="dropdown-item">
                            Dropdown item
                        </a>
                        <a className="dropdown-item">
                            Other dropdown item
                        </a>
                        <a href="#" className="dropdown-item is-active">
                            Active dropdown item
                        </a>
                        <a href="#" className="dropdown-item">
                            Other dropdown item
                        </a>
                        <hr className="dropdown-divider"/>
                        <a href="#" className="dropdown-item">
                            With a divider
                        </a>
                    </div>
                </div>
            </div>
            <div>Entries</div>
        </div>
        <table className="table is-fullwidth is-striped">
            <thead>
            <tr>
                <th><abbr title="Name">Name</abbr></th>
                <th><abbr title="Date">Date</abbr></th>
                <th><abbr title="Phone Number">Phone Number</abbr></th>
                <th><abbr title="Address">Address</abbr></th>
                <th><abbr title="Class">Class</abbr></th>
                <th><abbr title="Action">Action</abbr></th>
            </tr>
            </thead>
            <tbody>
            {Users.map((item, index) => {
                const user = new User(item)
                return <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.address}</td>
                    <td className="has-text-info">{user.class}</td>
                    <td>
                        <div className=" is-inline">
                            <div onClick={() => {
                                setUpdateFlag(prevState => ({...index}))
                                setNewUser(prevState => ({...Users[index]}))
                                handleClick()
                            }} className="button is-info mx-2"> Edit
                            </div>
                            <div onClick={() => handleDelete(item.id)} className="button is-danger"> Delete</div>
                        </div>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
        <nav className="pagination" role="navigation" aria-label="pagination">
            <a className="pagination-previous">Previous</a>
            <a className="pagination-next">Next page</a>
            <ul className="pagination-list">
                <li>
                    <a className="pagination-link" aria-label="Goto page 1">1</a>
                </li>
                <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                    <a className="pagination-link" aria-label="Goto page 45">45</a>
                </li>
                <li>
                    <a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
                </li>
                <li>
                    <a className="pagination-link" aria-label="Goto page 47">47</a>
                </li>
                <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                    <a className="pagination-link" aria-label="Goto page 86">86</a>
                </li>
            </ul>
        </nav>
    </div>
}

export default UserManager
