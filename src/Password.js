import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPassword } from './features/passwords/passwordsSlice'
import zxcvbn from 'zxcvbn'


function random(n) {
  return Math.floor(Math.random() * n)
}

function generatePassword() {
  // generate a password here
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w' , 'x', 'y', 'z'];
  let new_password = ''
  for (let i = 1; i < 9; i++) {
    new_password += letters[random(letters.length)]
  }

  const password_stats = zxcvbn(new_password)
  console.log(zxcvbn(new_password));
  const passwords = [new_password, password_stats]
  return passwords
}


function Password() {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('p@$$w0rd')
  const [name, setName] = useState('')

  return (
  <div>
    <div>
      <h1>Your Password: {password}</h1>
      <small>Password Strength: {generatePassword()[1].score}/4</small>
    </div>
    
    <input
      placeholder="Enter Name"
      type="text"
      onChange={(e) => setName(e.target.value)}
      value={name}
    />

    <input 
      type="text"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
    />

    <div>
      <button
        className='button'
        onClick={(e) => {setPassword(generatePassword()[0])
          }}>Generate</button>
      <button
        className='button'
        onClick={() => dispatch(addPassword({name, password})
          )}>Save
      </button>
    </div>
  </div>
  )
}

export default Password