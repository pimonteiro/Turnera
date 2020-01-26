import React, {Component} from 'react'
import {Grid, Card, CardContent, CardActions, Button, Avatar, Link, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const friends = [
    {
        id: 1,
        name: "Filipe Monteiro"
    },
    {
        id: 2,
        name: "Márcia Weeb"
    }
]

class FriendList extends Component {
    constructor(props){
        super(props)
        this.state = {
            friends,
            remove_id: ""
        }
        this.removeFriend = this.removeFriend.bind(this)
    }

    getFriends(){

    }

    removeFriend(){
        axios.delete("link" + "/users/" + this.props.match.userId + "/friends/" + this.state.remove_id)
        .then(res => {
            this.props.history.push("/" + this.props.match.userId + "/groups")
        })
        .catch(res => {
            console.log(res)
        })
    }

    renderFriends(){
        var newlist = []
        if (friends.length === 0 ) {
            newlist.push(<h3>Sem amigos.</h3>);
        }
      
        friends.forEach((f, index) =>
            newlist.push(
                <Grid item xs={6}>
                    <Card style={{textAlign:"center"}}>
                        <CardContent>
                            <Grid container style={{justifyContent:"center"}}>
                                <Grid item xs={12}>
                                    <Avatar></Avatar>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color="textSecondary">
                                        <Link href={"/users/" + f.id}>
                                            {f.name}
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button onClick={this.removeFriend}>Remove</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )   
        )

        return newlist
    }


    render() {
        return (
            <div>
                <Typography component={'h1'}
                        variant={'h3'}
                    >
                        Amigos
                </Typography>
                {this.renderFriends()}
            </div>
        )
    }
}

export default FriendList