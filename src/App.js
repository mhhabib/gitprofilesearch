import './App.css';
import React, { useState, useEffect } from 'react';
import {Form, Icon, Image, Grid, Container,Divider} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Results from './component/Results'

function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [html_url, setHtmlUrl] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [allrepos, setAllRepos] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [gists, setGist] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/facebook")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
    fetch("https://api.github.com/users/facebook/repos?page=1&per_page=1000")
      .then(res => res.json())
      .then(data => {
        setAllRepos(data)
      })
  },[]);

  const setData = ({ name, login, html_url, followers, following, public_repos, avatar_url ,public_gists}) => {
    setName(name);
    setUsername(login);
    setHtmlUrl(html_url)
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setGist(public_gists)
  };

  const handleSearch = e => {
    setUserInput(e.target.value);
  }
  const handleSubmit = async() => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          if(userInput.length<1) setError("Please put someone user name")
          else setError(`Sorry ${userInput} is not found!`)
        }
        else {
          setData(data);
          setError(null);
        }
      })
    fetch(`https://api.github.com/users/${userInput}/repos?page=1&per_page=1000`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          if(userInput.length<1) setError("Please put someone user name")
          else setError(`Sorry ${userInput} is not found!`)
        }
        else {
          setAllRepos(data);
          setError(null);
        }
      })
  }
  allrepos.sort(function(a,b){
      if(a.stargazers_count - b.stargazers_count){
        return a.stargazers_count - b.stargazers_count;
      }
      else{
          return a.forks_coun - b.forks_coun;
      }
    }
  );
  allrepos.reverse();
  return (
    <>
      <div className="navBar">
        <h2>Github<span> Search</span></h2>
      </div>
      <div className="search">
         <Form  onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='User name'
              name='Username'
              onChange={handleSearch}
              icon='github'
            />
          </Form.Group>
        </Form>
      </div>

      {error ? (<h3 className="error">{error}</h3>) :
        
        <Container text>
          <Grid padded className="grid">
            <Grid.Row >
              <Grid.Column width={6}>
                <Image src={avatar} />
              </Grid.Column>
              <Grid.Column className='my-info' width={10}>
                <h3 className='name'>{name}</h3>
                <p><Icon color='teal' name='linkify' /><a href={html_url}>{userName}</a></p>
                <p><Icon color='teal' name='user' /> Following: {following} </p>
                <p><Icon color='teal' name='users' /> Followers: {followers} </p>
                <p><Icon color='teal' name='unordered list' /> Repositories: {repos} </p>
                <p><Icon color='teal' name='unordered list' /> Gists: {gists} </p>
              </Grid.Column>
              </Grid.Row>
          </Grid>
          <Divider hidden />
          <h3 className="list-of-repos">
            <Icon color="orange" name="folder open"/>List of Public Repositories</h3>
          <Divider hidden />
          <Results data={allrepos}/>
        </Container>
      }
      <footer className="footer">
        <p><Icon color="grey" name="copyright outline"/>Devloped by <Icon color="black" name="github"/><a href="https://github.com/mhhabib" target='_blank' rel="noreferrer">mhhabib</a></p>
      </footer>
    </>
  );
}

export default App;
