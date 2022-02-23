import React, {useState, useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './Modal';

function App() {
  const initialValues = { // initial values state
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    select: "",
    check: false,
  }

  const [modal, setModal] = useState(false); // setting state for modal (inital state is false)
  const [formValues, setFormValues] = useState(initialValues); // setting state for values
  const [formErrors, setFormErrors] = useState({}); //seting state for errors
  const [isSubmit, setIsSubmit] = useState(false); // setting state for submission

  const handleChange = (e) => { // selecting values from user
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  }
  const handleSubmit = (e) => { // submit function
    e.preventDefault();
    setFormErrors(validate(formValues));
    setModal(!modal);
    setIsSubmit(true);
    
  }

  // useEffect(() => {
  //   if(Object.keys(formErrors).length===0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formValues, formErrors, isSubmit]); //useEffect dependencies


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) { //validating first name
      errors.firstname = "First Name is required!";
    }
    if (!values.lastname) { // validating last name
      errors.lastname = "Last Name is required!";
    }
    if (!values.check) { // validating last name
      errors.check = "Agree to KJK Africa's Terms and Conditions";
    }
    if (!values.email) { // validating email address
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if(!values.select) { //validating city/country
      errors.select = "Please select your city";
    }
    if (!values.password) { // validating password
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  if(modal) {
    document.body.classList.add("active-modal"); // this displays the modal section, when an action is called
  }
  else{
    document.body.classList.remove("active-modal") // this cancels the action called
  }
  return (
    <div className="app-container">

      <div className="first-container">
        <p className="brand-name">Surge</p>
        <h1 className="about-heading">Let us build Africa's next biggest products together</h1>
        <p className="about-paragraph">Our talents at KJK solutions for the world's most respectable technology-driven companies. By joining our network, you are up for a challenging work that will occupy your mind and a communicty of top-fields techies that will offer you opportunities for continous growth</p>
        <p className="upon-paragraph">Upon your form submission.</p>
        <ul className="list-items">
          <li className="list-item">-A short English proficiency test (10 mins)</li>
          <li className="list-item">-A coding challenge (1 hour)</li>
          <li className="list-item">-A live technical interview with our experts (1 hour)</li>
        </ul>
        <a href='/' className="sign-up-link">Sign up and be a step closer to joining our tech base.</a>
      </div>

      <div className="second-container">
        <h1 className="form-heading">KJK.Africa Tech Talents</h1>
        <h3 className="form-sub-heading">Apply to join our Ecosystem</h3>
        
        <form className="form-container">
          <div className="name-div">
            <div className="input-items">
              <label>First Name</label>
              <input 
                className="input-field" 
                type="text" 
                onChange={handleChange}
                name="firstname"
                value={formValues.firstname}
                />
                <p className="error-paragraph">{formErrors.firstname}</p>
            </div>
            

            <div className="input-items">
              <label>Last Name</label>
              <input 
                className="input-field" 
                type="text" 
                onChange={handleChange}
                name="lastname"
                value={formValues.lastname}
              />
              <p className="error-paragraph">{formErrors.lastname}</p>
            </div>
          </div>

            <div className="input-items">
              <label>Email address</label>
              <input 
                className="input-field" 
                type="text" 
                onChange={handleChange}
                name="email"
                value={formValues.email}
              />
              <p className="error-paragraph">{formErrors.email}</p>
            </div>

            <div className="input-items">
              <label>City / Country</label>
                <select 
                  className="input-field"
                  onChange={handleChange}
                  name="select"
                  value={formValues.select}
                >
                  <option>Select your City</option>
                  <option value="1">Benin</option>
                  <option value="2">Ibadan</option>
                </select>
                <p className="error-paragraph">{formErrors.select}</p>
            </div>

          <div className="input-items">
            <label>Password</label>
            <input 
              className="input-field" 
              type="password" 
              onChange={handleChange}
              name="password"
              value={formValues.password}
            />
            <p className="error-paragraph">{formErrors.password}</p>
          </div>
          

          <div className="form-others">
            <div className="checkbox">
              <input 
                type="checkbox" 
                className="check-box" 
                onChange={handleChange} 
                name="check"
                value="check"
              /> Agree to KJK Africa's Terms and Conditions?
              <p className="error-paragraph">{formErrors.check}</p>
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            
            <div>
              Already have an account? <a href="/" className="login-link">LOG IN</a>
            </div>

          </div>
        </form>
        {
          Object.keys(formErrors).length === 0 && isSubmit && (
            modal &&(<Modal handleSubmit={handleSubmit}/>) // after submitting the form, it open modal if validation is successful
          ) 
        }
      </div>
    </div>
  );
}

export default App;