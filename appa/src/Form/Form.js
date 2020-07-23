import React,{ useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { initialUserForm, initialFormErrors } from '../initials'
import formSchema from './Schema'

const Form = props => {
    // eslint-disable-next-line
    const { users, setUsers } = props

    const [userForm, setUserForm] = useState({_: 'UserForm', ...initialUserForm})
    const [formErrors, setFormErrors] = useState({_: 'FormErrors', ...initialFormErrors})
    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        formSchema.isValid(userForm).then(valid => {
            setSubmitDisabled(!valid)
        })
    },[userForm])

    const TrimData = data => {
        return {
            name: data.name.trim(),
            email: data.email.trim(),
            password: data.password,
            role: data.role,
        }
    }

    const FormChange = evt => {
        let { name, value, checked } = evt.target
        yup
            .reach(formSchema, name)
            .validate(name === 'tos' ? checked : value)
            .then(valid => setFormErrors({...formErrors, [name]: ''}))
            .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
        setUserForm({...userForm, [name]: name === 'tos' ? checked : value})
    }
    const FormSubmit = evt => {
        evt.preventDefault()
        setSubmitDisabled(true)
        axios.post('https://reqres.in/api/users',TrimData(userForm))
            .then(res => {
                setUsers([res.data, ...users])
                setUserForm(initialUserForm)
            })
            .catch(err => {
                debugger
            })
    }

    return(
        <form onSubmit={FormSubmit}>
            <div className='inputs'>
            <label>
                Name:
                <input
                    className='textbox'
                    name='name'
                    type='text'
                    value={userForm.name}
                    onChange={FormChange}
                ></input>
            </label>
            <label>
                Email:
                <input
                    className='textbox'
                    name='email'
                    type='email'
                    value={userForm.email}
                    onChange={FormChange}
                ></input>
            </label>
            <label>
                Password:
                <input
                    className='textbox'
                    name='password'
                    type='password'
                    value={userForm.password}
                    onChange={FormChange}
                ></input>
            </label>
            <label>
                Role:
                <select className='textbox' name='role' onChange={FormChange}>
                    <option selected disabled>Select a Role</option>
                    <option value='instructor'>Instructor</option>
                    <option value='teamLead'>Team Lead</option>
                    <option value='student'>Student</option>
                </select>
            </label>
            <label>
                Terms:
                <input
                    name='tos'
                    type='checkbox'
                    checked={userForm.tos}
                    onChange={FormChange}
                ></input>
            </label>
            <button disabled={submitDisabled}>Submit</button>
            </div>
            <div className='errors'>
                <p>{formErrors.name}</p>
                <p>{formErrors.email}</p>
                <p>{formErrors.password}</p>
                <p>{formErrors.role}</p>
                <p>{formErrors.tos}</p>
            </div>
        </form>
    )
}
export default Form