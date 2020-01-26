import React, {Component} from 'react'
import {Grid, Card, CardContent, CardActions, Button, Avatar, Link, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

const friends_req = [
    {
        id: 5,
        name: "Leonardo Silva"
    }
]

class FriendList extends Component {
    constructor(props){
        super(props)
        this.state = {
            friends,
            friends_req,
        }
    }

    getFriends(){

    }

    getFriendsRequests(){

    }

    renderFriends(lst, msg){
        var newlist = []
        if (lst.length === 0 ) {
            newlist.push(<h3>{msg}</h3>);
        }
      
        lst.forEach((f, index) =>
            newlist.push(
                <Grid item xs={1}>
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
                            <Button>Remove</Button>
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
               <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component={'h1'}
                            variant={'h3'}
                        >
                            Pedidos de Amizade
                        </Typography>
                        <Grid container spacing={2}>
                            {this.renderFriends(this.state.friends_req, "Sem pedidos.")}
                        </Grid>
                   </Grid>
                   <Grid item xs={12}>
                    <Typography component={'h1'}
                            variant={'h3'}
                        >
                            Amigos
                        </Typography>
                        <Grid container spacing={2}>
                        {this.renderFriends(this.state.friends, "Sem amigos.")}
                        </Grid>
                   </Grid>
               </Grid>
            </div>
        )
    }
}

export default FriendList