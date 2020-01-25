import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import React from 'react';

const useStyles = makeStyles(theme => ({
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function parseUsers(users) {
  const renderedUsers = [];

  if (users.length === 0) {
    renderedUsers.push(<p key={0}>Sem utilizadores</p>);
  }

  users.forEach((user, index) =>
    renderedUsers.push(
      <div key={index}>
        <a href={`/users/${user.id}`}>{ user.name }</a>
      </div>
    )
  );

  return renderedUsers;
}

function parsePosts(posts) {
  const renderedPosts = [];

  if (posts.length === 0) {
    renderedPosts.push(<p key={0}>Sem posts</p>);
  }

  posts.forEach((post, index) =>
    renderedPosts.push(
      <div key={index}>
        <a href={`/posts/${post.id}`}>{post.text.substring(0, 10)}</a>
      </div>
    )
  );

  return renderedPosts;
}

function parseGroups(groups) {
  const renderedGroups = [];

  if (groups.length === 0) {
    renderedGroups.push(<p key={0}>Sem grupos</p>);
  }

  groups.forEach((group, index) =>
    renderedGroups.push(
      <div key={index}>
        <a href={`/groups/${group.id}`}>{group.name}</a>
      </div>
    )
  );

  return renderedGroups;
}

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open] = React.useState(true);

  return (
    props.state ? <div>
      <Modal
        aria-describedby={'transition-modal-description'}
        aria-labelledby={'transition-modal-title'}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={props.closeSearch.bind(this)}
        open={open}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id={'transition-modal-title'}>Resultados da Pesquisa</h2>
            <h3>Utilizadores:</h3>
            { parseUsers(props.usersSearchResults) }
            <h3>Publicações:</h3>
            { parsePosts(props.postsSearchResults) }
            <h3>Grupos:</h3>
            { parseGroups(props.groupsSearchResults) }
          </div>
        </Fade>
      </Modal>
    </div> : <div />
  );
}
