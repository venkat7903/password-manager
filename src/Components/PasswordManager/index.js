import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import EmptyPasswordView from '../EmptyPasswordView'
import PasswordItem from '../PasswordItem'
import './index.css'

const backgroundList = [
  'blue',
  'yellow',
  'green',
  'orange',
  'light-green',
  'red',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isChecked: false,
    passwordsList: [],
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const randomNum = Math.floor(Math.random() * backgroundList.length)
    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      backgroundClassName: backgroundList[randomNum],
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredList})
  }

  onWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onToggleCheckbox = event => {
    this.setState({isChecked: event.target.checked})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderAddNewPasswords = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state
    const {width} = window.screen
    console.log(width)
    const passwordManagerImgUrl =
      width > 768
        ? 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
    return (
      <div className="inputs-img-container">
        <img
          src={passwordManagerImgUrl}
          alt="password manager"
          className="password-manager-img"
        />
        <form className="inputs-container" onSubmit={this.addPassword}>
          <h1 className="form-title">Add New Password</h1>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="input-img"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Website"
              value={websiteInput}
              onChange={this.onWebsiteInput}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="input-img"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Username"
              value={usernameInput}
              onChange={this.onChangeName}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="input-img"
            />
            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={passwordInput}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="add-password-btn">
            Add
          </button>
        </form>
      </div>
    )
  }

  getSearchResults = () => {
    const {searchInput, passwordsList} = this.state
    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  showPasswordItems = () => {
    const {isChecked} = this.state
    const searchResults = this.getSearchResults()

    return (
      <ul className="passwords-list">
        {searchResults.map(each => (
          <PasswordItem
            key={each.id}
            passwordDetails={each}
            isChecked={isChecked}
            deleteItem={this.deleteItem}
          />
        ))}
      </ul>
    )
  }

  renderShowPasswords = () => {
    const {searchInput, isChecked} = this.state
    const searchResults = this.getSearchResults()
    return (
      <div className="show-passwords-container">
        <div className="title-count-search-container">
          <div className="count-container">
            <h1 className="your-pass-title">Your Passwords</h1>
            <p className="passwords-count">{searchResults.length}</p>
          </div>
          <div className="search-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-img"
            />
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              onChange={this.onSearchInput}
              value={searchInput}
            />
          </div>
        </div>
        <div className="checkbox-label-container">
          <input
            type="checkbox"
            id="checkbox"
            onChange={this.onToggleCheckbox}
            checked={isChecked}
          />
          <label htmlFor="checkbox">Show Passwords</label>
        </div>
        <div className="show-empty-or-passwords-container">
          {searchResults.length === 0 ? (
            <EmptyPasswordView />
          ) : (
            this.showPasswordItems()
          )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="password-manager-app-container">
        <div className="sub-password-manager-app-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          {this.renderAddNewPasswords()}
          {this.renderShowPasswords()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
